import { Module } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { UserService } from 'src/Users/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PrismaService, UserService,JwtService],
  exports: [PrismaService, UserService,JwtService],
})
export class SharedModule {}
