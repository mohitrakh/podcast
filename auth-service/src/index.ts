import app from './app';
import { connectDB } from './config/db';
import { config } from './config/index';

const startServer = async () => {
  await connectDB();
  
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};

startServer();
