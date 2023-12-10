import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { AuthJwtGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guard/auth.role';
import { CreatePokemonDto } from './DTO/create-pokemon.dto';
import { Pokemon } from '@prisma/client';
import { UpdatePokemonDTO } from './DTO/update-pokemon.dto';

@Controller('pokemon')
@ApiBearerAuth()
@UseGuards(AuthJwtGuard)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post('import')
  @UseGuards(new RoleGuard('ADMIN'))
  async importPokemonData(): Promise<{ count: number; message: string }> {
    return await this.pokemonService.importFromExcel();
  }

  @Post('newPokemon')
  @UseGuards(new RoleGuard('ADMIN'))
  async cretePokemonRecord(
    @Body() createPokemonDto: CreatePokemonDto,
  ): Promise<Pokemon> {
    return await this.pokemonService.createNewPokemon(createPokemonDto);
  }

  @Put(':id')
  @UseGuards(new RoleGuard('ADMIN'))
  async updatePokemon(
    @Body() pokemonDTO: UpdatePokemonDTO,
    @Param('id') id: string,
  ): Promise<Pokemon> {
    return await this.pokemonService.updatePokemon(pokemonDTO, id);
  }
}
