/*eslint-disable */
import { Notification } from "../database/models";
class NotificationService {
  static createNotification({ title, message, link, userId }) {
    return Notification.create({ title, message, link, userId });
  }
  static getNotification(id) {
    return Notification.findOne({ where: { id } });
  }
  static deleteNotification(id, userId) {
    return Notification.destroy({ where: { id, userId } });
  }
  static markNotificationAsRead(id, userId) {
    return Notification.update(
      { status: "read" },
      {
        where: { id, userId },
      }
    );
  }
  static markUserNotificationsAsRead(userId) {
    return Notification.update(
      { status: "read" },
      {
        where: { userId },
      }
    );
  }
}
export default NotificationService;
