import { Router } from 'express';
import index from './welcome';
import auth from './Auth';

const router = Router();

router.get("/users", async (req, res) => {
    res.send({
      message: "Nothing is set yet!"
    });
  });
router.use('/auth', auth);

export default router;
