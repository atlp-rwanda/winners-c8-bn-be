import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /*:
 *   get:
 *     tags:
 *       - Unknown Route
 *     name: unknown
 *     summary: unknown Route
 *     consumes:
 *        - application/json
 *     responses:
 *       404:
 *             description: Route Not Found.
 * */

router.get('*', (req, res) => {
  res.status(404).send({ status: 404, message: 'not found' });
});

export default router;
