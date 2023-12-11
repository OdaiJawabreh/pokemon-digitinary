import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../PrismaService';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
// import { UpdatePasswordDto } from './dto/update-password.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '../Shared/enums';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService, JwtService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'testpassword',
      role: Role.ADMIN,
    };

    const createdUser: User = {
      id: '1',
      email: createUserDto.email,
      name: createUserDto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'ADMIN',
      password: 'hashed_password',
    };

    jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

    const result = await userController.signup(createUserDto);
    expect(result).toBe(createdUser);
  });
  it('should update a user', async () => {
    const id = '1';
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
    };

    const updatedUser: User = {
      id,
      email: 'test@example.com',
      name: 'Updated User',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'ADMIN',
      password: 'hashed_password',
    };

    jest.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser);

    const result = await userController.updateUser(id, updateUserDto);
    expect(result).toBe(updatedUser);
  });
  it('should delete a user', async () => {
    const id = '1';

    const deletedUser: User = {
      id,
      email: 'test@example.com',
      name: 'Updated User',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: 'ADMIN',
      password: 'hashed_password',
    };

     jest.spyOn(userService, 'delete').mockResolvedValue(deletedUser);

    const result = await userController.delete(id);
    expect(result).toEqual(deletedUser);
  });
});
