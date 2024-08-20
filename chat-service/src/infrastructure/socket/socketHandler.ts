import { Server, Socket } from 'socket.io';

interface RoomUsers {
  [roomId: string]: Set<string>;
}

function chatHandler(io: Server): void {
  const roomUsers: RoomUsers = {};
  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.query.userId as string;

    let currentRoom: string | null = null;
    socket.on('joinRoom', ({ roomId, userId }) => {
      if (currentRoom) {
        leaveRoom(socket, currentRoom, userId);
      }
      socket.join(roomId);
      currentRoom = roomId;
      if (!roomUsers[roomId]) {
        roomUsers[roomId] = new Set();
      }
      roomUsers[roomId].add(userId);
      socket.to(roomId).emit('userJoined', userId);

      // Send list of online users to the newly joined user
      socket.emit('onlineUsers', Array.from(roomUsers[roomId]));

      console.log(`User ${userId} joined clan: ${roomId}`);
      console.log(
        `Online users in room ${roomId}:`,
        Array.from(roomUsers[roomId]),
      );
    });

    socket.on('leaveRoom', ({ roomId, userId }) => {
      leaveRoom(socket, roomId, userId);
    });

    socket.on('sendMessage', async ({ roomId, message }) => {
      console.log('Message received:', message, 'Room:', roomId);
      io.to(roomId).emit('message', message);
      socket.to(roomId).emit('messageStatusUpdate', { _id: message._id, status: 'delivered' });
    });
    socket.on('messageRead', async ({ roomId, messageId }) => {
      io.to(roomId).emit('messageStatusUpdate', { _id: messageId, status: 'read' });
    });

    socket.on('typing', ({ roomId, user }) => {
      console.log(`${user} is typing in room ${roomId}`);
      socket.to(roomId).emit('typing', { user });
    });

    socket.on('deleteMessage', ({ roomId, messageId }) => {
      socket.to(roomId).emit('deleteMessage', { messageId });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', userId);
      if (currentRoom) {
        leaveRoom(socket, currentRoom, userId);
      }
    });
  });

  function leaveRoom(socket: Socket, roomId: string, userId: string) {
    socket.leave(roomId);
    if (roomUsers[roomId]) {
      roomUsers[roomId].delete(userId);
      socket.to(roomId).emit('userLeft', userId);
      console.log(`User ${userId} left clan: ${roomId}`);
      console.log(
        `Online users in room ${roomId}:`,
        Array.from(roomUsers[roomId]),
      );
    }
  }
}

export default chatHandler;
