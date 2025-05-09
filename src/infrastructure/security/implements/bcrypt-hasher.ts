import { HashGenerator } from '../abstract/hash-generator';
import { HashComparer } from '../abstract/hash-comparer';
import * as bcrypt from 'bcrypt';

export class BcryptHasher implements HashGenerator, HashComparer {
  private salt_length = 10;

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt_length);
  }

  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
