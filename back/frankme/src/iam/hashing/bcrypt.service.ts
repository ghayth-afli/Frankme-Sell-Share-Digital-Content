import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { compare, genSalt } from 'bcrypt';
import { hash } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  compare(data: string | Buffer, encrypted: string): Promise<Boolean> {
    return compare(data, encrypted);
  }

  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }
}
