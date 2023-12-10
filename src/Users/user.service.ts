import {
  Injectable,
  OnModuleInit,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { CreateUserDto } from './DTO/create-user.dto';
import {  User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './DTO/update-user.dto';
import { ObjectId } from 'mongodb';
import {Role} from "../Shared/enums"

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}
  async onModuleInit() {
    // Check if an admin user  exists
    const adminUserExists = await this.checkAdminExists();

    // If no admin user exists, create one
    if (!adminUserExists) {
        const adminUserDto = {
            email: 'odai@pokemon.go',
            name: 'odai',
            role: Role.ADMIN,
            password: 'odai-pokemongo',
        };

        // Create the admin user
        await this.create(adminUserDto);
    }
}

  async findAll() {
    try {
      const result = await this.prismaService.user.findMany();
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDTO = {
      ...createUserDto,
      password: hashedPassword,
    };
    try {
      const user = await this.prismaService.user.create({
        data: userDTO,
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // check if the id have format of objectId
    const isValidObjectId = ObjectId.isValid(userId);

    if (!isValidObjectId) {
      throw new BadRequestException('Invalid user ID format');
    }

    try {
      // get the user and check if exist or not
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        // Handle the case where the user is not found, throw an error or return as needed
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      // Update the user data

      const updatedUser = await this.prismaService.user.update({
        where: { id: userId },
        data: { ...updateUserDto },
      });

      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
  async delete(userId: string): Promise<User> {
    try {
      const deletedUser = await this.prismaService.user.delete({
        where: { id: userId },
      });

      if (!deletedUser) throw new BadRequestException('Invalid user ID format');
      return deletedUser;
    } catch (error) {
      // check if the id have format of objectId
      const isValidObjectId = ObjectId.isValid(userId);
      if (!isValidObjectId) {
        throw new BadRequestException('Invalid user ID format');
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
  async findUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }
  async checkAdminExists(): Promise<User | null> {
    const adminUser = await this.prismaService.user.findUnique({
        where: { email: 'odai@pokemon.go' },
    });
    return adminUser;
}
}
