import { Injectable } from '@nestjs/common';
import { AuthUseCase } from './auth-use-case/auth-use-case';
import { LoginCredentialDTO, RegisterCredentialDTO } from './domain/auth-dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usecase : AuthUseCase
    ){}

    async createUser(dto : RegisterCredentialDTO){
        const response = await this.usecase.register(dto)
        return response 
    }

    async connectUser(dto : LoginCredentialDTO){
        const response = await this.usecase.login(dto)
        return response
    }

    async getProfile(email : string){
        const response = await this.usecase.getProfile(email)
        return response
    }
}
