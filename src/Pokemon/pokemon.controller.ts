import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { AuthJwtGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from "../auth/guard/auth.role";
import { CreatePokemonDto } from './DTO/create-pokemon.dto';
import { Pokemon } from '@prisma/client';
import { UpdatePokemonDTO } from './DTO/update-pokemon.dto';
import { FilterPokemonDTO } from './DTO/filter-pokemon.dto';

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
  // i desided to be filter on 4 coulnms name podexNumer and eveloved and this will support paggination
  @Post('filter')
  async getPokemons(
    @Body() filterPokemonDTO: FilterPokemonDTO,
  ): Promise<{ total: number; data: Pokemon[] }> {
    return await this.pokemonService.filterPokemons(filterPokemonDTO);
  }

  @Delete(':id')
  @UseGuards(new RoleGuard({ role: 'ADMIN' }))
  async deletePokemon(@Param('id') id: string): Promise<{pokemon: Pokemon, message: string}> {
    return  this.pokemonService.deletePokemon(id);
  }
}
