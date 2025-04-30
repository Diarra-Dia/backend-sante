import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userData: UserDto) {
    const existingUser = await this.userService.userByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await this.userService.creerUtilisateur({
      ...userData,
      password: hashedPassword,
    });

    const jwt = await this.jwtService.signAsync({
      email: userData.email,
      sub: newUser.id,
    });

    const { password, ...result } = newUser;

    return {
      ...result,
      accessToken: jwt,
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.userByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user; // Ici pas besoin de return conditionnel, tu l'as déjà checké
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new Error('email ou mot de passe incorrect');
    }

    const jwt = await this.jwtService.signAsync({
      email: user.email,
      sub: user.id,
    });

    const { password: _, ...result } = user;

    return {
      ...result,
      accessToken: jwt,
    };
  }
}
