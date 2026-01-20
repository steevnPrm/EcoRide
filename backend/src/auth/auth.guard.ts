
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { user?: any }>();
    console.log('Récéption du token en cours...')
    // 1️⃣ lire le token depuis le cookie
    let token = request.cookies?.jwt;
    console.log('Token Reçue dans le Guard  : ' , token)

    // 2️⃣ si absent, lire depuis le header Authorization
    if (!token) {
      const authHeader = request.headers['authorization'];
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
      console.log('AuthGuard payload:', payload);
      return true;
    } catch {
      throw new UnauthorizedException('Token invalide');
    }
  }
}
