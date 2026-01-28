import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AdminRepository } from './repository/admin.repository';

@Injectable()
export class AdminService {
    constructor(
        private readonly repository : AdminRepository
    ){}

    async getUsers() {
  try {
    return await this.repository.findAllUsers();
  } catch (err) {
    throw new Error('Erreur lors de la récupération des utilisateurs');
  }
}

}
