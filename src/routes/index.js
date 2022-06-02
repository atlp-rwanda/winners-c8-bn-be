import { Router } from 'express';
import index from './welcome';
import auth from './Auth';

const router = Router();

router.use('/', index);
router.use('/auth', auth);

export default router;
