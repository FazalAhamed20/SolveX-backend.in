import { Server, Socket } from 'socket.io';

function notificationHandler(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log("Socket Connection established");

    socket.on('joinRoom', (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined room ${userId}`);
    });

    socket.on('joinRequest', (data) => {
      console.log("Received join request:", data);
      const { clanId, userId, userName, clanName, leaderId } = data;

      try {
        io.to(leaderId).emit('joinRequestNotification', {
          id:`${clanId}-${userId}`,
          content: `${userName} wants to join your clan ${clanName}`,
          type: 'clanRequest',
          userData: {
            userId: userId,
            username: userName,
          },
          clanId: clanId,
        });
        console.log(`Notification sent to leader ${leaderId}`);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });
  });
}

export default notificationHandler;