import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/api/public/podcast/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'Podcast service is healthy' });
});

export default app;
