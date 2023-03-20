import { Env } from '@env';
import mongoose, { now } from 'mongoose';
import { BinaryLike, pbkdf2Sync } from 'node:crypto';
import { IUser } from '@interfaces';

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  contact: {
    userName: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    profilePhoto: { type: String },
  },
  createdAt: { type: Date, default: now },
  updatedAt: { type: Date },
  deletedAt: { type: Date },
});

class CryptoParams {
  private static readonly salt: BinaryLike = Env('CRYPTO_SALT');
  private static readonly iterations = +Env('CRYPTO_ITERATIONS');
  private static readonly keyLength = +Env('CRYPTO_KEY_LENGTH');
  private static readonly digest: string = Env('CRYPTO_DIGEST');

  static getParams() {
    return {
      salt: CryptoParams.salt,
      iterations: CryptoParams.iterations,
      keyLength: CryptoParams.keyLength,
      digest: CryptoParams.digest,
    };
  }
}

UserSchema.methods.setPassword = function (password: string): void {
  const { salt, iterations, keyLength, digest } = CryptoParams.getParams();
  this.password = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
};

UserSchema.methods.validPassword = function (password: string): boolean {
  const { salt, iterations, keyLength, digest } = CryptoParams.getParams();
  const hash = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');

  return this.password === hash;
};

export const User = mongoose.model('User', UserSchema);
