import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    example: 'admin@pokemon.go',
    description: 'User email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'admin-pokemon.go',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
