import { Router } from "express";
import {
  getAllNotification,
  getSingleNotification,
  markAllNotificationAsRead,
  markSingleNotificationAsRead,
  deleteNotification,
  updateNotificationMethod,
} from "../controllers/notificationController";
import validations from "../validations";
import { protect } from "../middlewares/AuthoMiddleware";

const router = Router();
router.get("/", [protect], getAllNotification);
router.patch("/", [protect], markAllNotificationAsRead);
router.patch(
  "/method",
  [protect, validations.verifyNotificationMethod],
  updateNotificationMethod
);

router.get("/:id", [protect], getSingleNotification);
router.patch("/:id", [protect], markSingleNotificationAsRead);
router.delete("/:id", [protect], deleteNotification);

export default router;
