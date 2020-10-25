/**
 * Entry to all app routes
 *
 */

import { Router } from 'express';
import Handler from '../utils/middleware/Handler';
import apiRouter from './api';

const router = Router();

router.use('/api', apiRouter);
router.use('/*', Handler.pathNotFound);

export default router;
