import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import crypto from 'crypto';
import { IUser } from './interface';

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  contact: {
    userName: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    profilePhoto: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
});

UserSchema.methods.setPassword = function (password: string): void {
  const salt = process.env.CRYPTO_SALT;
  const iterations = parseInt(process.env.CRYPTO_ITERATIONS);
  const keyLength = parseInt(process.env.CRYPTO_KEY_LENGTH);
  const digest = process.env.CRYPTO_DIGEST;

  this.password = crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest);
};

UserSchema.methods.validPassword = function (password: string): boolean {
  const salt = process.env.CRYPTO_SALT;
  const iterations = parseInt(process.env.CRYPTO_ITERATIONS);
  const keyLength = parseInt(process.env.CRYPTO_KEY_LENGTH);
  const digest = process.env.CRYPTO_DIGEST;

  const hash = crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest);

  return this.password === hash;
};

export const User = mongoose.model('User', UserSchema);
