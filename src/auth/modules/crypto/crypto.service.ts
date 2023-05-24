import { Injectable } from '@nestjs/common';
import { hash, compare, genSalt } from 'bcryptjs';

@Injectable()
export class CryptoService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
