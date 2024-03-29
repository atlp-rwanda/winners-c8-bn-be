/*eslint-disable */
import { Notification, User } from "../database/models";
class NotificationService {
  static createNotification({ title, message, link, userId }) {
    return Notification.create({ title, message, link, userId });
  }
  static getNotifications(userId) {
    return Notification.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      include: [{ model: User, as: "associatedUser" }],
    });
  }
  static getNotification(id, userId) {
    return Notification.findOne({ where: { id, userId } });
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
  static changeNotificationMethod(userId, method) {
    return User.update({ allowedNotificationMethod: method }, { where: { id: userId } });
  }
}
export default NotificationService;
