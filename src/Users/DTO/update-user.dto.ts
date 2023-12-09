import { IsEmail, IsString, IsEnum, IsOptional, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../Shared/enums';

// Define a DTO for updating user data with a PUT request
export class UpdateUserDto {
    @ApiProperty({
        example: '8',
        description: 'User Id ',
      })
      @IsEmail()
      @IsNotEmpty()
      readonly id: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'Email address for the user',
      })
      @IsEmail()
      @IsOptional()
      readonly email: string;
    
      @ApiProperty({
        example: 'John Doe',
        description: 'Name of the user',
      })
      @IsOptional()
      @IsString()
      readonly name: string;
    
      @ApiProperty({
        example: 'password', 
        description: 'The new user password (optional, min length: 7)',
      })
      @IsOptional()
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
