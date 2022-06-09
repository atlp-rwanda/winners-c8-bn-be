import express from 'express'
const router = express.Router()
import {UserControllers} from '../controllers/usersControllers'
import { isSuperAdmin } from '../middlewares/isSuperAdmin'

router.get('/users', UserControllers.getUsers)
router.patch('/assignRole', isSuperAdmin, UserControllers.assignRole)

export default router