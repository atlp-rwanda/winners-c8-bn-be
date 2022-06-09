import { Router } from "express";
import {updateUserProfile} from '../controllers/user'

const router=Router()

router.patch('/update/:userId',updateUserProfile)

export default router