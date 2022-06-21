import express from 'express';
const router = express.Router();
import {UserControllers} from '../controllers/usersControllers';
import verifyToken from '../middlewares/Authorization';
import { isSuperAdmin } from '../middlewares/isSuperAdmin'

router.patch('/assignRole', verifyToken, isSuperAdmin, UserControllers.assignRole)

export default router