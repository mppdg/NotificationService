/**
 * Defines all notification routes
 *
 */
import { Router } from 'express';
import NotificationController from '../../controllers/NotificationController';
import Auth from '../../utils/middleware/Auth';

const router = Router();

router.get('/', Auth.authenticate, NotificationController.getAll);

router.post('/subscribe', Auth.authenticate, NotificationController.subscribe);

router.delete('/unsubscribe', Auth.authenticate, NotificationController.unsubscribe);

router.post('/publish', Auth.authenticate, NotificationController.publish);

router.post('/topics', Auth.authenticate, NotificationController.createTopic);

router.get('/topics', Auth.authenticate, NotificationController.listTopics);

export default router;