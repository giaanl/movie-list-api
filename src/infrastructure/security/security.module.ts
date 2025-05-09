import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { Encrypter } from './abstract/encrypter';
import { HashComparer } from './abstract/hash-comparer';
import { HashGenerator } from './abstract/hash-generator';
import { BcryptHasher } from './implements/bcrypt-hasher';
import { JwtEncrypter } from './implements/jwt-encrypter';

@Module({
  providers: [
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    JwtService,
  ],
  exports: [HashGenerator, HashComparer, Encrypter],
})
export class SecurityModule {}
