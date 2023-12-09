import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
// import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
// @ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll()
  }
}
