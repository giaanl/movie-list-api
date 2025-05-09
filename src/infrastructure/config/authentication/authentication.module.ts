import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { AuthenticationController } from '../../controllers/authentication.controller';
import { RegisterService } from '../../../application/services/register.service';
import { AuthenticationService } from '../../../application/services/authentication.service';
import { SecurityModule } from '../../security/security.module';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/infrastructure/strategies/jwt.strategy';
@Module({
  imports: [TypeOrmModule.forFeature([User]), SecurityModule],
  controllers: [AuthenticationController],
  providers: [
    RegisterService,
    AuthenticationService,
    JwtService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    JwtStrategy,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
