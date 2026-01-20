import { Module } from '@nestjs/common';
import { RidesService } from './rides.service';
import { RidesController } from './rides.controller';
import { RideUseCase } from './ride-use-case/ride-use-case';
import { RideRepository } from './ride-repository/ride-repository';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [RidesController],
  providers: [
    RidesService,
    RideUseCase,
    RideRepository,
  ],
})
export class RidesModule {}
