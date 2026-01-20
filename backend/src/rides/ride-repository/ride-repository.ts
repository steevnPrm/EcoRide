import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateRideDto } from "../dto/create-ride.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RideRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** ========================
   * CREATE
   * ======================== */
  async create(dto: CreateRideDto) {
    return this.prisma.ride.create({
      data: {
        arrival: dto.arrival,
        departure: dto.departure,
        ownerId: dto.userId,
      },
    });
  }

  /** ========================
   * READ - Get one ride by ID
   * ======================== */
  async findById(id: string) {
    return this.prisma.ride.findUnique({
      where: { id },
      include: {
        owner: {
          select: { id: true, firstname: true, lastname: true, username: true },
        },
      },
    });
  }

  /** ========================
   * READ - Get all rides for a user
   * ======================== */
  async findAll() {
    return await this.prisma.ride.findMany({
        orderBy: {
            createdAt : "desc"
        }
    })
  }

  /** ========================
   * DELETE - Delete ride by ID
   * ======================== */
  async delete(id: string) {
    return this.prisma.ride.delete({
      where: { id },
    });
  }
}
