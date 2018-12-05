const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const addAuthRoutes = require('./routes/auth-route');
const addCheerRoutes = require('./routes/cheer-route');
const addUserRoutes = require('./routes/user-route');
const addUserCheerRoutes = require('./routes/rsvp-user-cheer-route');
const history = require('connect-history-api-fallback');

const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: 'cheer app',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    expires: 600000
  }
}))


addAuthRoutes(app)
addCheerRoutes(app);
addUserRoutes(app);
addUserCheerRoutes(app);

// app.get('/', (req, res) => {
//   res.redirect('/')
// })

app.use(history());
app.use(express.static('public'));


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3003;
http.listen(PORT, () => console.log(`cheersMate api listening on port ${PORT}`));



