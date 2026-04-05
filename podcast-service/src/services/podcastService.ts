import Podcast, { IPodcast } from '../models/Podcast';

class PodcastService {
  public async createPodcast(data: Partial<IPodcast>): Promise<IPodcast> {
    const podcast = new Podcast(data);
    return await podcast.save();
  }

  public async getAllPodcasts(): Promise<IPodcast[]> {
    return await Podcast.find().sort({ createdAt: -1 });
  }

  public async getPodcastById(id: string): Promise<IPodcast | null> {
    return await Podcast.findById(id);
  }
}

export default new PodcastService();
