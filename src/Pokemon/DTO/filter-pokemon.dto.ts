import {
  IsInt,
  IsBoolean,
  IsOptional,
  Min,
} from 'class-validator';

export class FilterPokemonDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsInt({
    message: 'the pokedexNumberFrom should be a number',
  })
  pokedexNumberFrom: number;
  @IsOptional()
  @IsInt({
    message: 'the pokedexNumberTo should be a number',
  })
  pokedexNumberTo: number;

  @IsOptional()
  @IsBoolean({
    message: 'the evolved should be a boolean',
  })
  evolved?: boolean;

  @IsOptional()
  @IsInt({
    message: 'the page should be a number',
  })
  @Min(1, { message: 'The page should be a positive integer' })
  page: number;

  @IsOptional()
  @IsInt({
    message: 'the perPage should be a number',
  })
  @Min(1, { message: 'The perPage should be a positive integer' })
  perPage: number;
}
