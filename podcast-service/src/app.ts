import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import podcastRoutes from './routes/podcastRoutes';
import episodeRoutes from './routes/episodeRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/api/public/podcast/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Podcast service is healthy' });
});

app.use('/api', podcastRoutes);
app.use('/api', episodeRoutes);

export default app;
