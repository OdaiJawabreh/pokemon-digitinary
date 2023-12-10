import { Module } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { UserService } from 'src/Users/user.service';

@Module({
  providers: [PrismaService, UserService],
  exports: [PrismaService, UserService],
})
export class SharedModule {}
