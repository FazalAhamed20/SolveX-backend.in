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
      console.log('userName',userName)

      try {
        io.to(leaderId).emit('joinRequestNotification', {
          id: `${clanId}-${userId}`,
          content: `${userName} wants to join your clan ${clanName}`,
          type: 'clanRequest',
          userData: {
            userId: userId,
            username: userName,
          },
          clanId: clanId,
          clanName:clanName
        });
        console.log(`Notification sent to leader ${leaderId}`);

        // Notify the user who sent the request
        io.to(userId).emit('requestPendingNotification', {
          id: `${clanId}-${userId}-pending`,
          content: `Your request to join ${clanName} is pending`,
          type: 'requestPending',
          clanData: {
            clanId: clanId,
            clanName: clanName,
          },
        });
        console.log(`Pending notification sent to user ${userId}`);

       
       

      } catch (error) {
        console.error("Error sending notification:", error);
      }
    });
    socket.on('acceptRequest', (data) => {
      console.log("Received accept request:", data);
      const { clanId, userId, clanName} = data;

      try {
        io.to(userId).emit('requestAcceptedNotification', {
          id: `${clanId}-${userId}-accept`,
          content: `Your request to join ${clanName} has been accepted`,
          type: 'requestAccepted',
          clanData: {
            clanId: clanId,
            clanName: clanName,
          },
        });
        console.log(`Accept notification sent to user ${userId}`);

      } catch (error) {
        console.error("Error sending acceptance notification:", error);
      }
    });
    socket.on('rejectRequest', (data) => {
      console.log("Received reject request:", data);
      const { clanId, userId, clanName } = data;

      try {
        io.to(userId).emit('requestRejectedNotification', {
          id: `${clanId}-${userId}-reject`,
          content: `Your request to join ${clanName} has been rejected`,
          type: 'requestRejected',
          clanData: {
            clanId: clanId,
            clanName: clanName,
          },
        });
        console.log(`Reject notification sent to user ${userId}`);

      } catch (error) {
        console.error("Error sending rejection notification:", error);
      }
    });
    socket.on('removeRequest', (data) => {
      console.log("Received remove request:", data);
      const { clanId, userId, clanName } = data;

      try {
        io.to(userId).emit('removedClanNotification', {
          id: `${clanId}-${userId}-removed`,
          content: `You are removed from the clan ${clanName}`,
          type: 'removedClan',
          clanData: {
            clanId: clanId,
            clanName: clanName,
          },
        });
        console.log(`Reject notification sent to user ${userId}`);

      } catch (error) {
        console.error("Error sending rejection notification:", error);
      }
    });
    socket.on('markNotificationsSeen', async ({ notificationIds }) => {
      try {
      
  
    
         
          io.emit('notificationMarkedAsRead', { notificationIds });

        console.log("messageId",notificationIds)
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    });

  });
}

export default notificationHandler;