/**
 * Defines all notification routes
 *
 */
import { Router } from 'express';
import NotificationController from '../../controllers/NotificationController';

const authenticate = (req: any, res: any, next: any) => next()

const router = Router();

router.get('/', authenticate, NotificationController.getAll);

router.post('/subscribe', authenticate, NotificationController.subscribe);

router.delete('/unsubscribe', authenticate, NotificationController.unsubscribe);

router.post('/publish', authenticate, NotificationController.publish);

router.post('/topic', authenticate, NotificationController.createTopic);

export default router;