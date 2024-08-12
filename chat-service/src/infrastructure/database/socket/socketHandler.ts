import { Server, Socket } from 'socket.io';

const users = new Map();

function chatHandler(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected');

    const userId = socket.handshake.query.userId;
    users.set(userId, socket.id);
  
    console.log("online",userId);
    
    socket.broadcast.emit('userOnline', { userId });

    socket.on('joinRoom', (clanId) => {
        socket.join(clanId);
        console.log(`User joined clan: ${clanId}`);

        
    
       
      });

      socket.on('sendMessage', async ({ roomId, message }) => {
       
    console.log(message,roomId)
        io.to(roomId).emit('message', message);
      });
      socket.on('typing', ({ roomId, user }) => {
        console.log("hello")
        socket.to(roomId).emit('typing', { user });
      });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      users.delete(userId);
      socket.broadcast.emit('userOffline', { userId });
    });
  });
}

export default chatHandler;