const rsvpUserCheer = require('./rsvp-user-cheer-service.js');
const cheerService = require('./cheer-service.js');


module.exports = io => {


    io.on('connection', socket => {
        console.log('a user connected');
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      
        socket.on('joinRoom', roomId =>{
          socket.join(roomId);
        })


        socket.on('newChatMsg', ({msg, cheerId})=>{
            cheerService.update(cheerId,{$push: {msgs: msg}})
                .then(() => {
                    io.to(cheerId).emit('gotNewChatMsg', msg);
                });

        });

        socket.on('userAttending', ({userId , cheerId})=> {
            io.emit('userAttended',{userId});
            rsvpUserCheer.add({userId , cheerId})
                .then(()=>{
                    socket.emit('updateCheer');
                });
        });

    });

}