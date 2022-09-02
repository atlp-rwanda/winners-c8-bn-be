import { ipsconnected } from "./chat-bot";
import userService from "../services/user";
import sendEmail from "../helpers/sendEmail";
import NotificationService from "../services/notification";
async function sendNotification({ title, message, link, userIds, throughEmail = true, throughInApp = true }) {
  const notifications = [];
  for (let id of userIds) {
    const user = await userService.checkUserById(id);
    if (!user) continue;
    if (throughEmail && (user.allowedNotificationMethod == "email" || user.allowedNotificationMethod == "both")) {
      await sendEmail({
        receiverEmail: user.email,
        subject: title,
        body: message,
        link: link,
        title,
        linkAltText: "link",
      });
    }

    const notification = await NotificationService.createNotification({
      title,
      message,
      link,
      userId: id,
      associatedUserId: user?.id,
    });
    /* istanbul ignore next */
    for (let value in ipsconnected) {
      if (ipsconnected[value].user.id === id)
        ipsconnected[value].socket.emit("notification", {
          title,
          message,
          user,
          link,
          associatedUser: user,
          notification,
          playNotificationSound:
            user?.allowedNotificationMethod == "inapp" || user?.allowedNotificationMethod == "both",
        });
    }
    notifications.push(notification);
  }
  return notifications;
}

export default sendNotification;
