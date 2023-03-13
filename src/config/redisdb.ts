import * as dotenv from 'dotenv';

dotenv.config();

export const redisConfig = {
  db: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(String(process.env.REDIS_PORT), 10) || 6379,
    password: process.env.REDIS_PASSWORD || 'rd33',
  },
};
