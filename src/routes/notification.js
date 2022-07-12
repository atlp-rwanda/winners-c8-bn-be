import { Router } from "express";
import {
  getAllNotification,
  getSingleNotification,
  markAllNotificationAsRead,
  markSingleNotificationAsRead,
  deleteNotification,
} from "../controllers/notificationController";
import { protect } from "../middlewares/AuthoMiddleware";

const router = Router();
router.get("/", [protect], getAllNotification);
router.patch("/", [protect], markAllNotificationAsRead);

router.get("/:id", [protect], getSingleNotification);
router.patch("/:id", [protect], markSingleNotificationAsRead);
router.delete("/:id", [protect], deleteNotification);

export default router;
