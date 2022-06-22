// this folder will contain routes methods, with the needed middlewares being passed as parameters ( ... )

import { Router } from "express";
import authcontrollers from "../controllers/Authcontrollers";
import isAuthenticated from "../middlewares/Authorization";
import AuthValidation from "../validations/index";
import sessionsRoutes from "./session";

const router = Router();

const { signup, signin, verifyUser, signout } = authcontrollers;
const { verifySignup, verifySignin } = AuthValidation;

/**
 * @openapi
 * /auth/register:
 *  post:
 *      tags:
 *          - User
 *      description: adding the data
 *      requestBody:
 *          description: Add the data
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          user_role:
 *                              type: string
 *                          managerId:
 *                              type: string
 *
 *      responses:
 *          '201':
 *              description: success response
 *          '409':
 *              description: user already exists
 *          '400':
 *              description: invalid request
 *          '500':
 *              description: internal server error
 */

router.post("/register", verifySignup, signup);
/**
 * @openapi
 * /auth/signin:
 *  post:
 *      tags:
 *          - User
 *      description: adding the data
 *      requestBody:
 *          description: Add the data
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          password:
 *                              type: string
 *                          email:
 *                              type: string
 *      responses:
 *          '200':
 *              description: success response
 *          '400':
 *              description: user error
 *          '404':
 *              description: user not found
 *          '500':
 *              description: internal server error
 */
router.post("/signin", verifySignin, signin);
router.get("/register/verifyuser/:token", verifyUser);
/**
 * @openapi
 * components:
 *      securitySchemes:
 *           BearerToken:
 *              type: apiKey
 *              in: header
 *              name: authorization
 *              default: Bearer 
 * /auth/signout:

 *      put:
 *          tags:
 *              - User
 *          security:
 *             - BearerToken: []
 *          description: Get the current user sessions
 *          responses:
 *              '200':
 *                  description: success response
 *              '401':
 *                  description: User need to login
 *              '500':
 *                  description: internal server error
 */
router.put("/signout", isAuthenticated, signout);
router.use("/sessions", isAuthenticated, sessionsRoutes);

/**
 * @swagger
 * /auth/register/verifyuser/{token}:
 *   get:
 *     summary: Verify a user
 *     tags:
 *       - User
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The token of user
 *     responses:
 *       '400':
 *         description: Token is invalid or expired
 *       '201':
 *         description: User verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/VerifiedRes'
 * components:
 *   schemas:
 *     VerifiedRes:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Shows the updated status of verification
 *           example: true
 *         message:
 *           type: string
 *           description: Details of the results
 *           example: User verified successfully.
 *         data:
 *           type: array
 *           description: returns [1] on success and [0] on failure.
 *           example: [1]
 */

router.get("/register/verifyuser/:token", verifyUser);
export default router;
