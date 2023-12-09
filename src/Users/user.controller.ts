import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserDto } from './DTO/create-user.dto';
import {  UpdateUserDto } from './DTO/update-user.dto';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll()
  };
  @Post('addUser')
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  };
  @Put(':id')
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userService.updateUser(userId, updateUserDto);
    return updatedUser;
  };
  @Delete(':id')
  delete(@Param('id') userId: string): Promise<User> {
    return this.userService.delete(userId);
  }
  
  
}
