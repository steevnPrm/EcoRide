import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './common/prisma/prisma.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PasswordManagementService } from './common/password-management/password-management.service';
import { CommonModule } from './common/common.module';
import { RidesModule } from './rides/rides.module';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal : true,
      envFilePath : ".env"
    }
  ), PrismaModule, AuthModule, CommonModule, RidesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, PasswordManagementService],
})
export class AppModule {}
