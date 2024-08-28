import { Server, Socket } from 'socket.io';
import { Message } from '../database/mongo/models';

interface RoomUsers {
  [roomId: string]: Set<string>;
}

interface Reaction {
  memberId: string;
  emoji: string;
  createdAt: string;
}

// In-memory storage for reactions
const messageReactions = new Map<string, Reaction[]>();

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
      console.log('messageid', message._id);
      updateMessageStatus(roomId, userId, 'delivered', message._id);
    });

    socket.on('messageRead', async ({ roomId, messageId }) => {
      console.log('m', messageId);
      io.to(roomId).emit('messageStatusUpdate', { _id: messageId, status: 'read' });
      updateMessageStatus(roomId, userId, 'read', messageId);
    });

    socket.on('typing', ({ roomId, user }) => {
      console.log(`${user} is typing in room ${roomId}`);
      socket.to(roomId).emit('typing', { user });
    });

    socket.on('deleteMessage', async (data: { roomId: string; messageId: string }) => {
      console.log('delete')
      try {
        const { roomId, messageId } = data;
        console.log('delete...............')
        socket.to(roomId).emit('deleteMessage', messageId);
        console.log(`Message ${messageId} deleted from room ${roomId}`);
      } catch (error) {
        console.error('Error in deleteMessage event:', error);
      }
    });

    socket.on('react_to_message', ({ messageId, emoji, userId }) => {
      try {
       

        io.emit('reaction_updated', {
          messageId: messageId,
           emoji:emoji,
          memberId: userId,
          createdAt: new Date().toISOString()
        });
        

      } catch (error) {
        console.error('Error handling reaction:', error);
        socket.emit('reaction_error', { error: 'Failed to process reaction' });
      }
    });

    socket.on('get_reactions', (messageId: string) => {
      const reactions = messageReactions.get(messageId) || [];
      socket.emit('reactions_received', { messageId, reactions });
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

async function updateMessageStatus(
  roomId: string,
  userId: string,
  status: 'delivered' | 'read',
  messageId?: string
) {
  try {
    console.log('Arguments:', { roomId, userId, status, messageId });
    const query: any = { roomId, userId };
    
    if (messageId) {
      query._id = messageId;
    }
    
    if (status === 'delivered') {
      query.status = 'sent';
    } else if (status === 'read') {
      query.status = { $in: ['sent', 'delivered'] };
    }

    console.log('Query:', query);
    
    const updateResult = await Message.updateMany({ clanId: roomId }, {
      $set: { status: status },
    });

    console.log('Update result:', updateResult);

    return updateResult;
  } catch (error) {
    console.error("Error updating message status:", error);
    throw new Error("Failed to update message status");
  }
}

export default chatHandler;