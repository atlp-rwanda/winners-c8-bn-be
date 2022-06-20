// this folder will contain routes methods, with the needed middlewares being passed as parameters ( ... )

import { Router } from "express";
import authcontrollers from "../controllers/Authcontrollers";
import isAuthenticated from "../middlewares/isAuthenticated";
import AuthValidation from "../validations/index";
import sessionsRoutes from "./session";

const router = Router();

const { signup, signin, verifyUser, signout } = authcontrollers;
const { verifySignup, verifySignin } = AuthValidation;

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
 * /auth/signout:
 *      get:
 *      tags:
 *          - User
 *      description: Get the current user sessions
 *      responses:
 *          '200':
 *              description: success response
 *          '409':
 *              description: User need to login
 *          '500':
 *              description: internal server error
 */
router.post("/signout", isAuthenticated, signout);
router.use("/sessions", isAuthenticated, sessionsRoutes);
export default router;
