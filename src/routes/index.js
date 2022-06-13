/* eslint-disable linebreak-style */
import dotenv from 'dotenv';
import { Router } from 'express';
import api from './api/apiRoutes';
import welcomeMessage from '../controllers/index';

dotenv.config();
const version = process.env.API_VERSION || 'v1';
const url = `/api/${version}`;
const router = Router();
router.get('/', welcomeMessage);
router.use(url, api);

export default router;
