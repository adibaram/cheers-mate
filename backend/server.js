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

const socketService = require('./services/socket-service')
socketService(io)
io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('joinRoom', room=>{
    socket.join(room);
  })

  socket.on('assignMsg', ({msg, room})=>{
    io.to(room).emit('renderMsg', msg);
    const roomId = '5bfe560584acc159d53423b0';
  })
});

const PORT = process.env.PORT || 3003;
http.listen(PORT, () => console.log(`cheersMate api listening on port ${PORT}`));



