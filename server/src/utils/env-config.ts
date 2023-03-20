import process from 'node:process';

interface EnvSchema {
  HOST: string;
  PORT: number;
  CORS_ORIGIN: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  CRYPTO_SALT: string;
  CRYPTO_KEY_LENGTH: number;
  CRYPTO_ITERATIONS: number;
  CRYPTO_DIGEST: string;
  MONGODB_URI: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
}

class Env {
  static readonly config = require('dotenv').config();
  constructor(keyVar: string) {
    Env.config;
    process.env[keyVar];
  }
}

const setEnvVarsProcess: any = (envVar: keyof Readonly<EnvSchema>) => new Env(envVar) as NodeJS.ProcessEnv;

export { setEnvVarsProcess as Env };
