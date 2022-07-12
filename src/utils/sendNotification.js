import { ipsconnected } from "./chat-bot";
import userService from "../services/user";
import sendEmail from "../helpers/sendEmail";
import NotificationService from "../services/notification";
async function sendNotification({
  title = "",
  message = "",
  link = "",
  userIds = [],
  throughEmail = true,
  throughInApp = true,
}) {
  const notifications = [];
  for (let id of userIds) {
    const user = await userService.checkUserById(id);
    if (
      throughEmail &&
      (user.allowedNotificationMethod == "email" ||
        user.allowedNotificationMethod == "both")
    ) {
      console.log("Sending the email");
      await sendEmail({
        to: user.email,
        subject: title,
        body: message,
        link: link,
      });
    }
    if (
      throughInApp &&
      (user.allowedNotificationMethod == "inapp" ||
        user.allowedNotificationMethod == "both")
    ) {
      for (let value in ipsconnected) {
        if (ipsconnected[value].user.id === id)
          ipsconnected[value].socket.emit("notification", {
            title,
            message,
            link,
          });
      }
    }
    const notification = await NotificationService.createNotification({
      title,
      message,
      link,
      userId: id,
    });
    notifications.push(notification);
  }
  return notifications;
}

export default sendNotification;
