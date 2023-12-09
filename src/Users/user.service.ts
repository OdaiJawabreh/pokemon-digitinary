import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../PrismaService';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}
  onModuleInit() {
    console.log('Hello Ots me ');
    // throw new Error('Method not implemented.');
  }

  async findAll() {
    const result = await this.prismaService.user.findMany()
    // console.log("odai");
    
    return result;
}
}
