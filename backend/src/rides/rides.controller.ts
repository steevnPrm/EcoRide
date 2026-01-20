import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RidesService } from './rides.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import type { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('rides')
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  /** ========================
   * CREATE
   * ======================== */
  @Post("create")
  async create(@Body() createRideDto: CreateRideDto, @Req() req) {
    const userEmail = req.user.email;
    return this.ridesService.create(createRideDto, userEmail);
  }

  /** ========================
   * READ - all rides of user
   * ======================== */
  @Get('getAll')
  async findAll() {
    return this.ridesService.findAll();
  }

  /** ========================
   * READ - one ride by ID
   * ======================== */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ridesService.findOne(id);
  }

  /** ========================
   * DELETE
   * ======================== */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.ridesService.remove(id);
  }
}
