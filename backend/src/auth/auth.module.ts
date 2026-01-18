import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth-repository/auth-repository';
import { AuthUseCase } from './auth-use-case/auth-use-case';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [PrismaModule , CommonModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, AuthUseCase],
})
export class AuthModule {}
