import { Request, Response } from 'express';
import episodeService from '../services/episodeService';
import { AuthRequest } from '../middleware/authMiddleware';
import { getNats } from '../config/nats-client';

class EpisodeController {
  public async createEpisode(req: AuthRequest, res: Response): Promise<void> {
    try {
      const BASE_URL = process.env.BASE_URL || `http://localhost:5000`;
      const file = req.file;
      const { podcastId, title, description, duration } = req.body;
      const creatorId = req.user?.id;

      if (!creatorId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      if (!podcastId || !title || !description) {
        res.status(400).json({ success: false, message: 'Missing required fields' });
        return;
      }

      if (!file) {
        res.status(400).json({ success: false, message: 'Audio file is required' });
        return;
      }

      const filename = file.filename;
      // Return the configured URL combining base URL and media/audio path
      const fileUrl = `${BASE_URL}/media/audio/${filename}`;

      const episode = await episodeService.createEpisode({
        podcastId, title, description, creatorId, fileUrl
      });

      await getNats().publish(
        "episode.created",
        JSON.stringify({
          episodeId: episode._id,
          podcastId: episode.podcastId,
          fileUrl
        })
      );
      res.status(201).json({ success: true, data: episode });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  }

  public async getEpisodesByPodcast(req: Request, res: Response): Promise<void> {
    try {
      const podcastId = req.params.podcastId as string;
      const episodes = await episodeService.getEpisodesByPodcast(podcastId);
      res.status(200).json({ success: true, data: episodes });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  }

  public async getEpisodeById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const episode = await episodeService.getEpisodeById(id);

      if (!episode) {
        res.status(404).json({ success: false, message: 'Episode not found' });
        return;
      }

      res.status(200).json({ success: true, data: episode });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  }

  public async publishEpisode(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const creatorId = req.user?.id;

      if (!creatorId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const episode = await episodeService.publishEpisode(id, creatorId);

      if (!episode) {
        res.status(404).json({ success: false, message: 'Episode not found or unauthorized' });
        return;
      }

      res.status(200).json({ success: true, data: episode });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  }
}

export default new EpisodeController();
