// this folder will contain routes methods, with the needed middlewares being passed as parameters ( ... )

import { Router } from "express";
import authcontrollers from "../controllers/Authcontrollers";
import AuthValidation from "../validations/index";

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
router.post("/signout", signout);
export default router;
