import { Router } from 'express';
import auth from './Auth';
import isAuthenticated from '../middlewares/Authorization';
import userRoutes from './usersRoutes'

<<<<<<< HEAD
=======
import userRoutes from './usersRoutes'

>>>>>>> 7eae1f7 (feat(user-roles-settings): implement user role assigning)
const router = Router();

router.get("/users",isAuthenticated, async (req, res) => {
    res.send({
      message: "Middlewares works successful!"
    });
  });
router.use('/auth', auth);
router.use('/v1/users', userRoutes)

export default router;
