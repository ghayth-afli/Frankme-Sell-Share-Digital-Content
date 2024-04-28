import { Injectable } from '@nestjs/common';

// This class acts as an interface for hashing services for better code extension
@Injectable()
export abstract class HashingService {
  abstract hash(data: string | Buffer): Promise<string>;
  abstract compare(data: string | Buffer, encrypted: string): Promise<Boolean>;
}
