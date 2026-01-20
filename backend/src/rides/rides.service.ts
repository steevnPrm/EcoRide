import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { UpdateRideDto } from './dto/update-ride.dto';
import { RideUseCase } from './ride-use-case/ride-use-case';
import { AuthRepository } from 'src/auth/auth-repository/auth-repository';

@Injectable()
export class RidesService {
  constructor(
    private readonly rideUseCase: RideUseCase,
    private readonly authRepository: AuthRepository, 
  ) {}

  /** ========================
   * CREATE
   * ======================== */
  async create(createRideDto: CreateRideDto, email: string) {
    return await this.rideUseCase.createRide(createRideDto, email);
  }

  /** ========================
   * READ - one ride by ID
   * ======================== */
  async findOne(id: string) {
    const ride = await this.rideUseCase.findRideById(id);
    if (!ride) throw new NotFoundException(`Ride #${id} introuvable`);
    return ride;
  }

  async findAll(){
    return await this.rideUseCase.findAllRide()
}

  /** ========================
   * DELETE
   * ======================== */
  async remove(id: string) {
    // Vérifie existence
    const ride = await this.rideUseCase.findRideById(id);
    if (!ride) throw new NotFoundException(`Ride #${id} introuvable`);

    return this.rideUseCase.removeRide(id);
  }
}
