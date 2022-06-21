import { Router } from "express";
import {updateUserProfile} from '../controllers/user'
import { protect } from "../middlewares/AuthoMiddleware";

const router=Router()

router.patch('/update/:userId',protect,updateUserProfile)

export default router