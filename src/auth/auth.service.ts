import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { LoginDTO } from './DTO/login.dto';
import { UserService } from '../Users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}


  async login(signInDto: LoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    
    try {
      const user = await this.userService.findUserByEmail(email);

      const isMatch = await this.comparePassword(password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Wrong password. Please try again.');
      }
      const accessToken = this.generateToken(user);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Authentication failed. Please try again.');
    }
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  private generateToken(userData: User): string {
    return sign( userData , 'your-access-token-secret', {
      expiresIn: '10d',
    })
  }
}
