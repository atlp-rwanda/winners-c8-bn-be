import { Router } from "express";
import { getAllNotification } from "../controllers/notificationController";
import { protect } from "../middlewares/AuthoMiddleware";

const router = Router();
router.get("/", [protect], getAllNotification);

/**
 * @swagger
 * /user/notifications/:
 *   get:
 *     summary: get all the notifications
 *     tags:
 *       - Notification
 *     security:
 *             - BearerToken: []
 *     responses:
 *       '200':
 *         description: Successfully.
 *       '401':
 *         description: Token is invalid or expired
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal server error
 *
 *
 *
 */

export default router;
