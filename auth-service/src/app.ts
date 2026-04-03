import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

// Global Error Handler should be the last middleware
app.use(errorHandler);

export default app;
