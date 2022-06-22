// this folder will contain routes methods, with the needed middlewares being passed as parameters ( ... )

import { Router } from 'express';
import authcontrollers from '../controllers/Authcontrollers';
import AuthValidation from '../validations/index';

const router = Router();

const { signup } = authcontrollers;
const { verifySignup } = AuthValidation;

router.post('/register', verifySignup, signup);

export default router;
