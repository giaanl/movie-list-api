import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { HashGenerator } from '../../infrastructure/security/abstract/hash-generator';
import { RegisterUserDTO } from '../dtos/register-user.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashGenerator: HashGenerator,
  ) {}

  async register({ name, email, password }: RegisterUserDTO) {
    const verifyUser = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (verifyUser) {
      throw new Error('User already exists');
    }

    if (!this.isPasswordValid(password)) {
      throw new Error('Password is not valid');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  private isPasswordValid(password: string) {
    return password.length >= 6;
  }

  private async hashPassword(password: string) {
    const hashedPassword = await this.hashGenerator.hash(password);
    return hashedPassword;
  }
}
