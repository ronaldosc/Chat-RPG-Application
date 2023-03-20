import { Env } from '@env';

export const redisConfig = {
  socket: {
    host: String(Env('REDIS_HOST')) || 'localhost',
    port: +Env('REDIS_PORT') || 6379,
  },
};
