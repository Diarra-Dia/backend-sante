import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ✅ Le Controller appelle uniquement le Service
  @Post()
  async creerUtilisateur(@Body() data: UserDto): Promise<User> {
    return this.userService.creerUtilisateur(data);
  }

  @Get()
  async obtenirTousLesUtilisateurs(): Promise<User[]> {
    return this.userService.obtenirTousLesUtilisateurs();
  }

  @Get(':id')
  async obtenirUnUtilisateur(@Param('id') id: number): Promise<User> {
    return this.userService.obtenirUnUtilisateur(id);
  }

  @Put(':id')
  async mettreAJourUtilisateur(
    @Param('id') id: number,
    @Body() data: Partial<User>,
  ): Promise<User> {
    return this.userService.mettreAJourUtilisateur(id, data);
  }

  @Delete(':id')
  async supprimerUtilisateur(@Param('id') id: number): Promise<void> {
    return this.userService.supprimerUtilisateur(id);
  }
}
