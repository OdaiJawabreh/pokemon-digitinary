import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import {  Weather, Type } from '../../Shared/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePokemonDto {
  @IsNotEmpty({
    message: 'the name cannot be empty',
  })
  @IsString({
    message: 'the name should be a string',
  })
  @ApiProperty({
    description: 'Name of the Pokémon',
    example: 'Pokémon',
  })
  name: string;
  @IsNotEmpty({
    message: 'the pokedexNumber cannot be empty',
  })
  @IsInt({
    message: 'the pokedexNumber should be a number',
  })
  @ApiProperty({
    description: 'Pokedex number of the Pokémon',
    example: 25,
  })
  pokedexNumber: number;
  @IsNotEmpty({
    message: 'the imgName cannot be empty',
  })
  @IsString({
    message: 'the imgName should be a string',
  })
  @ApiProperty({
    description: 'Image name of the Pokémon',
    example: 'pikachu.png',
  })
  imgName: string;
  @IsNotEmpty({
    message: 'the generation cannot be empty',
  })
  @IsInt({
    message: 'the generation should be a number',
  })
  @ApiProperty({
    description: 'Generation of the Pokémon',
    example: 1,
  })
  generation: number;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'evolution Stage of the Pokémon',
    example: 'Lower',
  })
  evolutionStage: String;

  @IsOptional()
  @IsBoolean({
    message: 'the evolved should be a boolean',
  })
  @ApiProperty({
    description: 'Evolved Pokémon ',
    example: true,
  })
  evolved?: boolean;
  @IsOptional()
  @IsInt({
    message: 'the familyID should be a number',
  })
  @ApiProperty({
    description: 'Family ID',
    example: 13,
  })
  familyId?: number;
  @IsBoolean({
    message: 'the crossGen should be a boolean',
  })
  @ApiProperty({
    description: 'Cross Generation',
    example: true,
  })
  crossGen?: boolean;

  @IsEnum(Type)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Type 1',
    example: 'Electric',
  })
  type1: Type;

  @IsOptional()
  @IsEnum(Type)
  @ApiProperty({
    description: 'Type 2',
    example: 'None',
  })
  type2: Type;

  @IsEnum(Weather)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Weather 1',
    example: 'Clear',
  })
  weather1: Weather;

  @IsOptional()
  @IsEnum(Weather)
  @ApiProperty({
    description: 'Weather 2',
    example: 'Fog',
  })
  weather2: Weather;

  @IsNotEmpty()
  @IsInt({
    message: 'the Total stats should be a number',
  })
  @ApiProperty({
    description: 'Total stats',
    example: 500,
  })
  statTotal: number;

  @IsInt({
    message: 'the Attack stat should be a number',
  })
  @IsNotEmpty({
    message: 'the Attack stat cannot be empty',
  })
  @ApiProperty({
    description: 'Attack stat',
    example: 100,
  })
  atk: number;
  
  @IsInt({
    message: 'the Defense stat should be a number',
  })
  @IsNotEmpty({
    message: 'the Defense stat cannot be empty',
  })
  @ApiProperty({
    description: 'Defense stat',
    example: 50,
  })
  def: number;

  @IsInt({
    message: 'the Stamina stat should be a number',
  })
  @IsNotEmpty({
    message: 'the Stamina stat cannot be empty',
  })
  @ApiProperty({
    description: 'Stamina stat',
    example: 150,
  })
  sta: number;

  @IsNotEmpty({
    message: 'the legendary cannot be empty',
  })
  @IsBoolean({
    message: 'the legendary should be a boolean',
  })
  @ApiProperty({
    description: 'Legendary status',
    example: false,
  })
  legendary: boolean;

  @IsNotEmpty({
    message: 'the aquireable cannot be empty',
  })
  @IsBoolean({
    message: 'the aquireable should be a boolean',
  })
  @ApiProperty({
    description: 'Aquireable status',
    example: false,
  })
  aquireable: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'the spawns should be a boolean',
  })
  @ApiProperty({
    description: 'Spawns status',
    example: false,
  })
  spawns: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'the regional should be a boolean',
  })
  @ApiProperty({
    description: 'Regional status',
    example: false,
  })
  regional: boolean;

  @IsOptional()
  @IsInt({
    message: 'the raidable should be a number',
  })
  @ApiProperty({
    description: 'Raidable status',
    example: 1,
  })
  raidable: number;

  @IsOptional()
  @IsInt({
    message: 'the hatchable should be a number',
  })
  @ApiProperty({
    description: 'Hatchable status',
    example: 1,
  })
  hatchable: number;

  @IsOptional()
  @IsBoolean({
    message: 'the shiny should be a boolean',
  })
  @ApiProperty({
    description: 'Shiny status',
    example: false,
  })
  shiny: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'the nest should be a boolean',
  })
  @ApiProperty({
    description: 'Nest status',
    example: false,
  })
  nest: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'the new should be a boolean',
  })
  @ApiProperty({
    description: 'New status',
    example: false,
  })
  new: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'the notGettable should be a boolean',
  })
  @ApiProperty({
    description: 'Not Gettable status',
    example: false,
  })
  notGettable: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'the futureEvolve should be a boolean',
  })
  @ApiProperty({
    description: 'Future Evolution status',
    example: false,
  })
  futureEvolve: boolean;

  @IsNotEmpty({
    message: 'the cpAt40 cannot be empty',
  })
  @IsInt({
    message: 'the cpAt40 should be a number',
  })
  @ApiProperty({
    description: 'CP at level 40',
    example: 900,
  })
  cp40: number;

  @IsNotEmpty({
    message: 'the cpAt39 cannot be empty',
  })
  @IsInt({
    message: 'the cpAt39 should be a number',
  })
  @ApiProperty({
    description: 'CP at level 39',
    example: 900,
  })
  cp39: number;
}
