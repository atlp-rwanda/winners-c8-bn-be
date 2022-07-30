import { Router } from "express";
import { updateUserProfile } from "../controllers/user";
import { protect } from "../middlewares/AuthoMiddleware";
import Validations from "../validations";
import notificationRoutes from "./notification";

const verifyUpdateUserProfile = Validations.verifyUpdateUserProfile;

const router = Router();
router.patch("/update", [protect, verifyUpdateUserProfile], updateUserProfile);
router.use("/notifications", notificationRoutes);

/**
 * @swagger
 * /user/update:
 *   patch:
 *     summary: update user profile
 *     tags:
 *       - User
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
 *     requestBody:
 *      content:
 *       multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          username:
 *                              type: string
 *                          phoneNumber:
 *                              type: string
 *                          gender:
 *                              type: string
 *                          image:
 *                              type: file
 *                          preferredLanguage:
 *                              type: string
 *                          preferredCurrency:
 *                              type: string
 *                          department:
 *                              type: string
 *
 *
 *
 *
 *
 *
 */

export default router;
