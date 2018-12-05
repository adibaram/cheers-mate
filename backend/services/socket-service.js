

module.exports = io => {

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
      
}