/**
 * Entry to all app routes
 *
 */

import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import Handler from '../utils/middleware/Handler';
import apiRouter from './api';
import swaggerDocument from '../utils/swagger.docs';


const router = Router();

router.use('/api', apiRouter);
router.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use('/*', Handler.pathNotFound);

export default router;
