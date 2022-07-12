/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import "dotenv/config";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import notificationService from "../services/notification";

export const getAllNotification = async (req, res) => {
  try {
    const notifications = await notificationService.getNotifications(
      req.user.id
    );
    return successResponse(
      res,
      200,
      "Successfully retrieved all notifications",
      notifications
    );
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};
