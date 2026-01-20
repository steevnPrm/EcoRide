import { Body, Controller, Post, Res, Get, Req, HttpCode, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { LoginCredentialDTO, RegisterCredentialDTO } from './domain/auth-dto';
import type { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  register(@Body() dto: RegisterCredentialDTO) {
    return this.authService.createUser(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dto: LoginCredentialDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.connectUser(dto);
    console.log(`token controller  : ${token}`)

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });

    return { authenticated: true };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const emailToken = {
      email : req.user.email
    }

    const profilData = await this.authService.getProfile(emailToken.email)
    return profilData
  }
}

