import { AuthRepository } from "src/auth/auth-repository/auth-repository";
import { CreateRideDto } from "../dto/create-ride.dto";
import { RideRepository } from "../ride-repository/ride-repository";
import { Injectable } from "@nestjs/common";


@Injectable()
export class RideUseCase {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly userRepository: AuthRepository
  ) {}

  async createRide(createRideDto: CreateRideDto, email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) throw new Error('Utilisateur introuvable, veuillez réessayer');

    return this.rideRepository.create({
      ...createRideDto,
      userId: user.id,
    });
  }

  async findAllRide() {
    return this.rideRepository.findAll(); 
  }

  async findRideById(id: string) {
    const ride = await this.rideRepository.findById(id);
    if (!ride) throw new Error(`Ride ${id} introuvable`);
    return ride;
  }

  async removeRide(id: string) {
    const ride = await this.rideRepository.findById(id);
    if (!ride) throw new Error(`Ride ${id} introuvable`);
    return this.rideRepository.delete(id);
  }
}
