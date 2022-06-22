import { Router } from "express";
import {updateUserProfile} from '../controllers/user'
import { protect } from "../middlewares/AuthoMiddleware";

const router=Router()

router.patch('/update',protect,updateUserProfile)

/**
 * @swagger
 * /user/update:
 *   patch:
 *     summary: update user profile
 *     tags:
 *       - User
 *     
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
 *                          username:
 *                              type: string
 *                          phoneNumber:
 *                              type: string
 *                          gender:
 *                              type: string
 *                          preferredLanguage:
 *                              type: string
 *                          preferredCurrency:
 *                              type: string
 *                          department:
 *                              type: string
 *                          lineManager:
 *                              type: string
 *                          
 *                       
 *                 
 *      
 * 
 */



 
export default router