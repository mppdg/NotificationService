/**
 * Entry to all app routes
 *
 */

import { Router } from 'express';
import apiRouter from './api';

const router = Router();

router.use('/api', apiRouter);
// router.use('/api', (req, res) => res.end("got herere"));

export default router;
