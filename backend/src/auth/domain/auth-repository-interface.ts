import { LoginCredentialDTO, RegisterCredentialDTO } from './auth-dto';

export interface IAuthRepository {
  createUser(dto: RegisterCredentialDTO);
  findUserByEmail(email : string);
  deleteUserByEmail(dto: LoginCredentialDTO);
}
