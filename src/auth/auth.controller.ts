import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.dto';
import { UserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createAuthDto: UserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const { accessToken } = await this.authService.register(createAuthDto);

      // Assurez-vous que le cookie est défini en fonction de l'environnement
      response.cookie('user', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // True uniquement en production
      });

      return {
        message: 'User created successfully',
        accessToken,
      };
    } catch (error) {
      if (error.response) {
        return response.status(error.status).json(error.response);
      } else {
        return response.status(500).json({
          message: 'Internal server error',
          error: error.message,
        });
      }
    }
  }

  @Post('login')
  async login(
    @Body() loginDto: AuthLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const { accessToken } = await this.authService.login(
        loginDto.email,
        loginDto.password,
      );

      // Définir le cookie avec l'authentification
      response.cookie('jwt', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // True uniquement en production
        sameSite: 'strict', // Ajoute cette option pour des raisons de sécurité
      });

      return {
        message: 'User logged in successfully',
        accessToken,
      };
    } catch (error) {
      return response.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  }
}
