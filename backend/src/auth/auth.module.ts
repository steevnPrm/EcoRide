import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth-repository/auth-repository';
import { AuthUseCase } from './auth-use-case/auth-use-case';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '30s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, AuthUseCase],
})
export class AuthModule {}
