import { Router } from 'express';
import podcastController from '../controllers/podcastController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/private/podcast', authenticate, podcastController.createPodcast);
router.get('/public/podcast', podcastController.getAllPodcasts);
router.get('/public/podcast/:id', podcastController.getPodcastById);

export default router;
