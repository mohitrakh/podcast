import Episode, { IEpisode } from '../models/Episode';

class EpisodeService {
  public async createEpisode(data: Partial<IEpisode>): Promise<IEpisode> {
    // Default fileUrl is already handled by Mongoose default
    // Default status is already 'draft' via Mongoose default
    const episode = new Episode(data);
    return await episode.save();
  }

  public async getEpisodesByPodcast(podcastId: string): Promise<IEpisode[]> {
    return await Episode.find({ podcastId }).sort({ createdAt: -1 });
  }

  public async getEpisodeById(id: string): Promise<IEpisode | null> {
    return await Episode.findById(id);
  }

  public async publishEpisode(id: string, creatorId: string): Promise<IEpisode | null> {
    return await Episode.findOneAndUpdate(
      { _id: id, creatorId },
      { status: 'published' },
      { new: true }
    );
  }
}

export default new EpisodeService();
