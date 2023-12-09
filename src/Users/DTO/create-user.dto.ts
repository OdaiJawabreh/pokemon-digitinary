import { IsEmail, IsString, IsEnum, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {Role} from "../../Shared/enums"
// Create a Data Transfer Object (DTO) for creating a user
export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address for the user',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'password', 
    description: 'The new user password (optional, min length: 7)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(7)
  readonly password: string;

  @ApiProperty({
    enum: Role,
    description: 'Role of the user (ADMIN or MEMBER)',
  })
  @IsOptional()
  @IsEnum(Role)
  readonly role: Role;
}

