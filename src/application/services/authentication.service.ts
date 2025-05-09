import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { HashComparer } from '../../infrastructure/security/abstract/hash-comparer';
import { Encrypter } from '../../infrastructure/security/abstract/encrypter';
import { LoginUserDTO } from '../dtos/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async authenticate({ email, password }: LoginUserDTO) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
} 