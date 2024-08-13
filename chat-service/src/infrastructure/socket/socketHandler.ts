import { Server, Socket } from 'socket.io';

const users = new Map();
const onlineUsers = new Set();

function chatHandler(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected');

    const userId = socket.handshake.query.userId as string;
    users.set(userId, socket.id);
    onlineUsers.add(userId);

    console.log('User connected:', userId);

    socket.on('joinRoom', ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`User ${userId} joined clan: ${roomId}`);
      socket.emit('initialOnlineStatus', Array.from(onlineUsers));
      socket.to(roomId).emit('userOnline', { userId });
    });

    socket.on('leaveRoom', ({ roomId, userId }) => {
      socket.leave(roomId);
      console.log(`User ${userId} left clan: ${roomId}`);
    });

    socket.on('sendMessage', async ({ roomId, message }) => {
      console.log('Message received:', message, 'Room:', roomId);
      io.to(roomId).emit('message', message);
    });

    socket.on('typing', ({ roomId, user }) => {
      console.log(`${user} is typing in room ${roomId}`);
      socket.to(roomId).emit('typing', { user });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', userId);
      users.delete(userId);
      onlineUsers.delete(userId);
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          io.to(room).emit('userOffline', { userId });
        }
      });
    });
  });
}

export default chatHandler;