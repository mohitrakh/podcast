import { Router } from 'express';
import episodeController from '../controllers/episodeController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/private/episode', authenticate, episodeController.createEpisode);
router.get('/public/episode/podcast/:podcastId', episodeController.getEpisodesByPodcast);
router.get('/public/episode/:id', episodeController.getEpisodeById);
router.patch('/private/episode/:id/publish', authenticate, episodeController.publishEpisode);

export default router;
