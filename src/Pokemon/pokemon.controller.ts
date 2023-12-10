import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { AuthJwtGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guard/auth.role';

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
}
