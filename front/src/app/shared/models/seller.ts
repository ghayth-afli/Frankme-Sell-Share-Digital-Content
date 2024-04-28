export interface seller {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePicture: string;
  hashedPassword: string;
  phone: string;
  isTfaEnabled: boolean;
  tfaSecret: string;
  balance: number;
  walletAddress: string;
}
