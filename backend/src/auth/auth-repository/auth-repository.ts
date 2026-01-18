import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { IAuthRepository } from '../domain/auth-repository-interface';
import { RegisterCredentialDTO, LoginCredentialDTO } from '../domain/auth-dto';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(dto: RegisterCredentialDTO) {
    const user = {
      firstname: dto.firstname,
      lastname: dto.lastname,
      username: dto.username,
      email: dto.email,
      password: dto.password,
    };

    return await this.prisma.user.create({
      data: user,
    });
  }
  async findUserByEmail(email : string) {
    const user = await this.prisma.user.findUnique({where : {email : email}})
    return user
  }
  deleteUserByEmail(dto: LoginCredentialDTO) {
    return this.prisma.user.delete({ where: { email: dto.email } });
  }
}
