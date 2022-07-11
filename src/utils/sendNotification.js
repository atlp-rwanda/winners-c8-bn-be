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
  userIds.forEach(async (id) => {
    const user = await userService.checkUserById(id);
    if (throughEmail && (user.allowedNotificationMethod = "email" || "both")) {
      sendEmail({
        to: user.email,
        subject: title,
        body: message,
        link: link,
      });
    }
    if (throughInApp && (user.allowedNotificationMethod = "inapp" || "both")) {
      //check if the user is online
      const online = ipsconnected.find((ipdata) => ipdata.user.id === id);
      if (online) online.socket.emit("notification", { title, message, link });
    }
    await NotificationService.createNotification({
      title,
      message,
      link,
      userId,
    });
  });
}

export default sendNotification;
