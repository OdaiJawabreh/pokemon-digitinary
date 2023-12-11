import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './DTO/create-pokemon.dto';
import { UpdatePokemonDTO } from './DTO/update-pokemon.dto';
import { Pokemon } from '@prisma/client';
import { PrismaService } from '../PrismaService';
import { JwtService } from '@nestjs/jwt';

describe('PokemonController', () => {
  let pokemoncontroller: PokemonController;
  let pokemonService: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService, PrismaService, JwtService],
    }).compile();

    pokemoncontroller = module.get<PokemonController>(PokemonController);
    pokemonService = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(pokemoncontroller).toBeDefined();
  });

  it('should create a new Pokemon', async () => {
    const createPokemonDto: CreatePokemonDto = {
      name: 'test',
      pokedexNumber: 25,
      generation: 2,
      imgName: 'img 1',
      evolved: false,
      crossGen: true,
      type1: 'Electric',
      weather1: 'Clear',
      statTotal: 12,
      atk: 4,
      def: 4,
      sta: 4,
      legendary: false,
      aquireable: false,
      spawns: true,
      regional: true,
      hatchable: 2,
      shiny: false,
      nest: true,
      new: false,
      notGettable: false,
      futureEvolve: false,
      cp40: 40,
      cp39: 39,
    };

    const createdPokemon: Pokemon = {
      id: '6576d1ac60c90754b966fccd',
      name: 'test',
      pokedexNumber: 25,
      imgName: 'img 1',
      generation: 2,
      evolutionStage: null,
      evolved: false,
      familyId: null,
      crossGen: true,
      type1: 'Electric',
      type2: null,
      weather1: 'Clear',
      weather2: null,
      statTotal: 12,
      atk: 4,
      def: 4,
      sta: 4,
      legendary: false,
      aquireable: false,
      spawns: true,
      regional: true,
      raidable: 0,
      hatchable: 2,
      shiny: false,
      nest: true,
      new: false,
      notGettable: false,
      futureEvolve: false,
      cp40: 40,
      cp39: 39,
    };

    jest.spyOn(pokemonService, 'createNewPokemon').mockResolvedValue(createdPokemon);

    const result = await pokemoncontroller.cretePokemonRecord(createPokemonDto);
    expect(result).toBe(createdPokemon);
  });

  it('should update a Pokemon', async () => {
    const id = '6576d1ac60c90754b966fccd';
    const updatePokemonDto: UpdatePokemonDTO = {
      name: 'update Pokemon',
    };

    const updatedPokemon: Pokemon = {
      id: '6576d1ac60c90754b966fccd',
      name: 'update Pokemon',
      pokedexNumber: 25,
      imgName: 'img 1',
      generation: 2,
      evolutionStage: null,
      evolved: false,
      familyId: null,
      crossGen: true,
      type1: 'Electric',
      type2: null,
      weather1: 'Clear',
      weather2: null,
      statTotal: 12,
      atk: 4,
      def: 4,
      sta: 4,
      legendary: false,
      aquireable: false,
      spawns: true,
      regional: true,
      raidable: 0,
      hatchable: 2,
      shiny: false,
      nest: true,
      new: false,
      notGettable: false,
      futureEvolve: false,
      cp40: 40,
      cp39: 39,
    };

    jest.spyOn(pokemonService, 'updatePokemon').mockResolvedValue(updatedPokemon);

    const result = await pokemoncontroller.updatePokemon(updatePokemonDto,id);
    expect(result).toBe(updatedPokemon);
  });

    it('should delete a Pokemon', async () => {
    const id = '6576d1ac60c90754b966fccd';
    const deletedPokemon: Pokemon = {
      id: '6576d1ac60c90754b966fccd',
      name: 'update Pokemon',
      pokedexNumber: 25,
      imgName: 'img 1',
      generation: 2,
      evolutionStage: null,
      evolved: false,
      familyId: null,
      crossGen: true,
      type1: 'Electric',
      type2: null,
      weather1: 'Clear',
      weather2: null,
      statTotal: 12,
      atk: 4,
      def: 4,
      sta: 4,
      legendary: false,
      aquireable: false,
      spawns: true,
      regional: true,
      raidable: 0,
      hatchable: 2,
      shiny: false,
      nest: true,
      new: false,
      notGettable: false,
      futureEvolve: false,
      cp40: 40,
      cp39: 39,
    };
     jest.spyOn(pokemonService, 'deletePokemon').mockResolvedValue( {pokemon:deletedPokemon, message:"Deleted Succssfuly"});

    const result = await pokemoncontroller.deletePokemon(id);
    expect(result).toEqual({pokemon:deletedPokemon, message:"Deleted Succssfuly"});
  });

});
