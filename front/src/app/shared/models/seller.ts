import { User } from './user';

export interface Seller extends User {
  profilePicture: string;
  hashedPassword: string;
  isTfaEnabled: boolean;
  tfaSecret: string;
  balance: number;
  walletAddress: string;
}
