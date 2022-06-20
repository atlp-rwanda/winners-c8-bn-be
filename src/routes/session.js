// this folder will contain routes methods, with the needed middlewares being passed as parameters ( ... )

import { Router } from "express";
import authcontrollers from "../controllers/Authcontrollers";

const router = Router();

const { getUserSessions, removeSession } = authcontrollers;

/**
 * @openapi
 * /auth/sessions:
 *  get:
 *      tags:
 *          - User session
 *      description: Get the current user sessions
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
router.get("/", getUserSessions);
/**
 * @openapi
 * /auth/sessions/{sessionId}:
 *  delete:
 *      tags:
 *          - User session
 *      description: Get the current user sessions
 *      parameters:
 *              - name: sessionId
 *                in: path
 *                description: sessionId
 *      responses:
 *          '200':
 *              description: success response
 *          '404':
 *              description: Session  not found
 *          '500':
 *              description: internal server error
 */
router.delete("/:sessionId", removeSession);
export default router;
