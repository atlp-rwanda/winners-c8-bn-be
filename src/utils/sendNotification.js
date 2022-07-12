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
    await NotificationService.createNotification({
      title,
      message,
      link,
      userId: id,
    });
  });
}

export default sendNotification;
