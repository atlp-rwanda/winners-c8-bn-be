import { Router } from 'express';
import index from './welcome';
import auth from './Auth';
import isAuthenticated from '../middlewares/Authorization';
import userRoutes from './usersRoutes'

const router = Router();

router.get("/users",isAuthenticated, async (req, res) => {
    res.send({
      message: "Middlewares works successful!"
    });
  });
router.use('/auth', auth);
router.use('/v1/users', userRoutes)

export default router;
