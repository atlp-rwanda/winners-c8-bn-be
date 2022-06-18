import { Router } from 'express';
import index from './welcome';
import auth from './Auth';
import userRoutes from './usersRoutes'

const router = Router();

router.get("/users", async (req, res) => {
    res.send({
      message: "Nothing is set yet!"
    });
  });
router.use('/auth', auth);
router.use('/v1/users', userRoutes)

export default router;
