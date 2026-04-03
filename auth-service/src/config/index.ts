import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_KEY as string,
};

if (!config.mongoUri) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

if (!config.jwtSecret) {
  console.error('JWT_KEY is not defined in the environment variables');
  process.exit(1);
}
