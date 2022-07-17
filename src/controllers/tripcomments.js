import models from "../database/models";
import Protection from "../middlewares/hash";
import errorResponse from "../utils/error";
import sendNotification from "../utils/sendNotification";

export class Comment {
  static async getAllComments(req, res) {
    const { tripId } = req.params;
    const { id } = req.user;
    try {
      const trip = await models.TripRequest.findOne({
        include: [models.Comments],
        where: { id: tripId },
      });
      if (!trip) {
        return res.status(404).json({
          status: 404,
          error: ` Trip not found`,
        });
      }

      if (id !== trip.ownerId && id !== trip.managerId) {
        return res.status(403).json({
          message: "You are not allowed to access the requested resources",
        });
      } else {
        return res.status(200).json({
          message: "Comments fetched successfully!",
          comments: trip.Comments,
        });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to fetch trip comments", err });
    }
  }

  static async createComment(req, res) {
    const { comment } = req.body;
    const { tripId } = req.params;
    const { id } = req.user;
    try {
      const trip = await models.TripRequest.findOne({
        include: [models.Comments],
        where: { id: tripId },
      });

      if (!trip) {
        return res.status(404).json({ message: ` Trip does not Exist !` });
      }
      if (id !== trip.ownerId && id !== trip.managerId) {
        return res.status(403).json({
          message: "You are not allowed to access these resources",
        });
      } else {
        const saveComment = await models.Comments.create({
          userId: id,
          tripId,
          message: comment,
        });
        let notificationReceiver = [];
        if (req.user.id === trip.ownerId)
          notificationReceiver.push(trip.managerId);
        else notificationReceiver.push(trip.ownerId);
        await sendNotification({
          title: `${req.user.firstName} commented on  trip`,
          message: comment,
          link: `${process.env.FRONTEND_URL}/trip-requests/${tripId}`,
          userIds: notificationReceiver,
        });
        return res.status(201).json({
          message: `Comment created successfully`,
          saveComment,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: ` Error creating trip!`,
        error,
      });
    }
  }

  static async deleteComment(req, res) {
    const { commentId } = req.params;
    const { tripId } = req.params;
    const { id } = req.user;
    try {
      const trip = await models.TripRequest.findOne({
        include: [models.Comments],
        where: { id: tripId },
      });
      const comment = await models.Comments.findByPk(commentId);

      if (!trip) {
        return res.status(404).json({ message: ` Trip does not Exist !` });
      } else if (id !== trip.ownerId && id !== trip.managerId) {
        return res.status(403).json({
          message: "You are not allowed to delete this comment",
        });
      } else if (!comment) {
        res.status(404).json({
          message: "No comment found with such Id",
        });
      } else {
        await models.Comments.destroy({ where: { id: commentId } });
        return res
          .status(200)
          .json({ message: "comment deleted successfully" });
      }
    } catch (error) {
      return res.status(500).json({
        message: ` Error deleting comment !`,
        error,
      });
    }
  }
}
