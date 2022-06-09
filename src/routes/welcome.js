import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.send({ message: 'Welcome to Winners Barefoot Nomad' });
});

export default router;
