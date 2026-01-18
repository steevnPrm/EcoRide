import { LoginCredentialDTO, RegisterCredentialDTO } from './auth-dto';

export interface IAuthService {
  register(dto: RegisterCredentialDTO);
  login(dto: LoginCredentialDTO);
}
