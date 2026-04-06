import app from './app';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { connectNats } from './config/nats-client';
import { listenEvents } from './config/listener';
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await connectNats();
  listenEvents();
  app.listen(PORT, () => {
    console.log(`Podcast service is running on port ${PORT}`);
  });
});
