import { Server, Socket } from 'socket.io';
import { createMessageUseCase } from '../../application/useCases/messageUseCase';
import { createUserUseCase } from '../../application/useCases/userUseCase';
import { createMessageRepository } from '../repositories/messageRepository';
import { createUserRepository } from '../repositories/userRepository';

const messageRepo = createMessageRepository();
const userRepo = createUserRepository();
const messageUseCase = createMessageUseCase(messageRepo);
const userUseCase = createUserUseCase(userRepo);

export function createSocketController(io: Server) {
  function handleConnection(socket: Socket): void {
    console.log('New client connected');

    socket.on('joinRoom', (roomName: string) => handleJoinRoom(socket, roomName));
    socket.on('sendMessage', (data: { roomName: string; message: any }) => handleSendMessage(socket, data));
    socket.on('typing', (data: { roomName: string; memberId: string; isTyping: boolean }) => handleTyping(socket, data));
    socket.on('disconnect', () => handleDisconnect(socket));
  }

  async function handleJoinRoom(socket: Socket, roomName: string): Promise<void> {
    socket.join(roomName);
    const user = await userUseCase.getUserBySocketId(socket.id);
    if (user) {
      await userUseCase.updateUserStatus(user.id, true);
      io.to(roomName).emit('memberJoined', user);
    }
  }

  async function handleSendMessage(socket: Socket, data: { roomName: string; message: any }): Promise<void> {
    const { roomName, message } = data;
    const savedMessage = await messageUseCase.saveMessage(message);
    io.to(roomName).emit('message', savedMessage);
  }

  function handleTyping(socket: Socket, data: { roomName: string; memberId: string; isTyping: boolean }): void {
    const { roomName, memberId, isTyping } = data;
    socket.to(roomName).emit('typingStatus', { memberId, isTyping });
  }

  async function handleDisconnect(socket: Socket): Promise<void> {
    console.log('Client disconnected');
    const user = await userUseCase.getUserBySocketId(socket.id);
    if (user) {
      await userUseCase.updateUserStatus(user.id, false);
      io.emit('memberLeft', user.id);
    }
  }

  return {
    handleConnection
  };
}
