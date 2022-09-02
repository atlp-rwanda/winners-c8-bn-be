/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import "dotenv/config";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import notificationService from "../services/notification";

export const getAllNotification = async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications(req.user.id);
    return successResponse(res, 200, "Successfully retrieved all notifications", notifications);
  } catch (err) {
    console.log(err);
    return errorResponse(res, 400, "Bad request", err.message);
  }
};
export const getSingleNotification = async (req, res) => {
  try {
    const notification = await notificationService.getNotification(req.params.id, req.user.id);
    return successResponse(res, 200, "Successfully retrieved all notifications", notification);
  } catch (err) {
    return errorResponse(res, 400, "Bad request", err.message);
  }
};
export const markAllNotificationAsRead = async (req, res) => {
  try {
    const updated = await notificationService.markUserNotificationsAsRead(req.user.id);
    return successResponse(res, 200, `${updated} has notification has been marked read`);
  } catch (err) {
    return errorResponse(res, 400, "Bad request", err.message);
  }
};

export const markSingleNotificationAsRead = async (req, res) => {
  try {
    await notificationService.markNotificationAsRead(req.params.id, req.user.id);
    return successResponse(res, 200, "Notification has been marked as read", "Notification update");
  } catch (err) {
    return errorResponse(res, 400, "Bad request", err.message);
  }
};
export const deleteNotification = async (req, res) => {
  try {
    await notificationService.deleteNotification(req.params.id, req.user.id);
    return successResponse(
      res,
      200,
      "Notification has been deleted successfully",
      "Notification has been deleted successfully"
    );
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
};
export const updateNotificationMethod = async (req, res) => {
  try {
    const method = req.body.method;
    await notificationService.changeNotificationMethod(req.user.id, method);
    return successResponse(
      res,
      200,
      "Notification method successfully changed",
      "Notification method successfully changed"
    );
  } catch (err) {
    errorResponse(res, 400, err.message);
  }
};
