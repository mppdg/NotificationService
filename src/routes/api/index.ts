/**
 * Entry to all API routes
 *
 */

import express from 'express';
import notificationRouter from './notification';
import authRouter  from './auth';

const router = express.Router();

router.use('/notifications', notificationRouter);
router.use('/auth', authRouter);

export default router;