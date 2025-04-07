import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = this.usersService.findByUsername(username);
    if (user.password != pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
  async register(registerUser: CreateUserDto) {
    const newUser = this.usersService.create(registerUser);
    const payload = { sub: newUser.id, username: newUser.username };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }
}
