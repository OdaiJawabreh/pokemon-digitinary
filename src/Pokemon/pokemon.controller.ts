import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { AuthJwtGuard } from '../auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('pokemon')
@ApiBearerAuth()
@UseGuards(AuthJwtGuard)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

}
