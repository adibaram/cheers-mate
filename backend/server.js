const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const addCheerRoutes = require('./routes/cheer-route');
const addUserRoutes = require('./routes/user-route');


const app = express()  

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));        
         
app.use(express.static('public'));

app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: 'cheer app',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

addCheerRoutes(app);
addUserRoutes(app);




const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`cheersMate api listening on port ${PORT}`));



