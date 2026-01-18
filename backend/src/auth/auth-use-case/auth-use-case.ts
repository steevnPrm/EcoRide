import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { IAuthService } from '../domain/auth-service-interface';
import { RegisterCredentialDTO, LoginCredentialDTO } from '../domain/auth-dto';
import { PasswordManagementService } from 'src/common/password-management/password-management.service';
import { AuthRepository } from '../auth-repository/auth-repository';

@Injectable()
export class AuthUseCase implements IAuthService {
  constructor(
    private readonly passwordManager: PasswordManagementService,
    private readonly repository: AuthRepository
  ) {}

  async register(dto: RegisterCredentialDTO) {
    // Validation des champs
    if (!dto.firstname) throw new BadRequestException('Veuillez renseigner un prénom');
    if (!dto.lastname) throw new BadRequestException('Veuillez renseigner un nom de famille');

    // Vérification du format d'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dto.email)) throw new BadRequestException('Veuillez renseigner un email valide');

    // Vérification doublon
    const existingUser = await this.repository.findUserByEmail(dto.email);
    if (existingUser) throw new ConflictException('Email déjà utilisé, vous connecter');

    // Hash du mot de passe
    const hashedPassword = await this.passwordManager.hash(dto.password);

    // Création de l'utilisateur
    const newUser = {
      firstname: dto.firstname,
      lastname: dto.lastname,
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    };
    const user = await this.repository.createUser(newUser);

    return {
      message: 'Utilisateur enregistré avec succès.',
      user: user.email,
    };
  }

  login(dto: LoginCredentialDTO) {
    throw new BadRequestException('Méthode non implémentée pour le moment.');
  }
}
