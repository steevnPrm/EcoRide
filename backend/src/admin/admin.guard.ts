import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService,
    private readonly jwt : JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    
    const token = req.cookies?.jwt;
    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }

    try {
      
      const payload = await this.jwt.verifyAsync(token)
      console.log(`/admin/guard - TOKEN Reçu : ${payload}`)
      
      const user = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user || !user.isAdmin) {
        throw new UnauthorizedException('Accès réservé aux administrateurs');
      }

      
      req.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token invalide');
    }
  }
}
