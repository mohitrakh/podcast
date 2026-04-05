import { Request, Response } from 'express';
import podcastService from '../services/podcastService';
import { AuthRequest } from '../middleware/authMiddleware';

class PodcastController {
  public async createPodcast(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      const creatorId = req.user?.id;

      if (!creatorId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      if (!title || !description) {
        res.status(400).json({ success: false, message: 'Missing required fields' });
        return;
      }

      const podcast = await podcastService.createPodcast({ title, description, creatorId });
      res.status(201).json({ success: true, data: podcast });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  }

  public async getAllPodcasts(req: Request, res: Response): Promise<void> {
    try {
      const podcasts = await podcastService.getAllPodcasts();
      res.status(200).json({ success: true, data: podcasts });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  }

  public async getPodcastById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const podcast = await podcastService.getPodcastById(id);
      
      if (!podcast) {
        res.status(404).json({ success: false, message: 'Podcast not found' });
        return;
      }
      
      res.status(200).json({ success: true, data: podcast });
    } catch (error) {
      res.status(500).json({ success: false, message: (error as Error).message });
    }
  }
}

export default new PodcastController();
