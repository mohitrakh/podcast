import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import podcastRoutes from './routes/podcastRoutes';
import episodeRoutes from './routes/episodeRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/media/audio', express.static(path.join(process.cwd(), 'uploads/audio')));

app.get('/api/public/podcast/health', (req: Request, res: Response) => {

  res.status(200).json({ success: true, message: 'Podcast service is healthy' });
});

app.use('/api', podcastRoutes);
app.use('/api', episodeRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Error occurred:", err);
  
  if (err instanceof Error) {
    if (err.name === 'MulterError') {
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    }
    return res.status(500).json({ success: false, message: err.message });
  }
  
  res.status(500).json({ success: false, message: 'An unknown error occurred' });
});

export default app;

