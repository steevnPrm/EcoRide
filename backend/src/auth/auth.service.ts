import { Injectable } from '@nestjs/common';
import { AuthUseCase } from './auth-use-case/auth-use-case';
import { RegisterCredentialDTO } from './domain/auth-dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usecase : AuthUseCase
    ){}

    async createUser(dto : RegisterCredentialDTO){
        const newUser = await this.usecase.register(dto)
        return newUser 
    }
}
