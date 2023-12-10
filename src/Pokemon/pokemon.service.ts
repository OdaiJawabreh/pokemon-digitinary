import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import * as XLSX from 'xlsx';
import { PrismaService } from '../PrismaService';
import { Pokemon } from '@prisma/client';
import { UpdatePokemonDTO } from './DTO/update-pokemon.dto';
import { FilterPokemonDTO } from './DTO/filter-pokemon.dto';
@Injectable()
export class PokemonService {
  constructor(private prismaService: PrismaService) {}

  async importFromExcel(): Promise<{ count: number; message: string }> {
    try {
      const filePath = 'Pokemon Go.xlsx';
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const pokemonData = XLSX.utils.sheet_to_json(sheet);
      const data = this.convertExcelData(pokemonData);
      const { count } = await this.prismaService.pokemon.createMany({
        data,
      });
      return { count, message: 'Data Uloaded Sucssfuly' };
    } catch (error) {
      console.error('Error importing data from Excel:', error);
      throw new InternalServerErrorException('Error importing data from Excel:', error);
    }
  }
  async createNewPokemon(createPokemonDto: any): Promise<Pokemon> {
    try {
      let { statTotal, atk, def, sta } = createPokemonDto;

      // Calculate statTotal if it's not provided
      if (statTotal === undefined) statTotal = atk + def + sta;

      // Update pokemonDTO with the calculated statTotal
      createPokemonDto = { ...createPokemonDto, statTotal };

      const newPokemon = await this.prismaService.pokemon.create({
        data: createPokemonDto,
      });
      return newPokemon;
    } catch (error) {
      throw new InternalServerErrorException('Error in createNewPokemon:', error);
    }
  }
  async updatePokemon(pokemonDTO: any, id: any): Promise<Pokemon> {
    try {
      const existingPokemon = await this.prismaService.pokemon.findUnique({
        where: { id },
      });
      if (!existingPokemon) {
        // Handle the case where the document was not found
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      const updatedpokemon = await this.prismaService.pokemon.update({
        where: { id },
        data: { ...pokemonDTO },
      });

      return updatedpokemon;
    } catch (error) {
      throw new InternalServerErrorException('Error updatePokemon :', error);
    }
  }
  async getNewTotal(
    existingPokemon: any,
    atk: any,
    def: any,
    sta: any,
  ): Promise<number> {
    const newatk = atk !== undefined ? atk : existingPokemon.atk;
    const newdef = def !== undefined ? def : existingPokemon.def;
    const newsta = sta !== undefined ? sta : existingPokemon.sta;

    return newatk + newdef + newsta;
  }
  async filterPokemons(
    filterDTO: FilterPokemonDTO,
  ): Promise<{ total: number; data: Pokemon[] }> {
    const { name, pokedexNumberFrom, pokedexNumberTo, evolved, page, perPage } =
      filterDTO;

    const filter: any = {
      name: {
        contains: name, 
        mode: 'insensitive',
      },
      pokedexNumber: {
        gte: pokedexNumberFrom,
        lte: pokedexNumberTo,
      },
      evolved,
    };

    const pagination: any =
      page !== undefined && perPage !== undefined
        ? {
            skip: (page - 1) * perPage,
            take: perPage,
          }
        : undefined;

   try {
    const [pokemons, total] = await Promise.all([
      this.prismaService.pokemon.findMany({
        where: filter,
        ...pagination,
      }),
      this.prismaService.pokemon.count({
        where: filter,
      }),
    ]);

    return { total, data: pokemons };
   } catch (error) {
    throw new InternalServerErrorException('Error filterPokemons :', error);

   }
  }
  async deletePokemon(id: string): Promise<{pokemon: Pokemon, message: string}> {
    try {
      const existingPokemon = await this.prismaService.pokemon.findUnique({
        where: { id },
      });

      if (!existingPokemon) {
        // Handle the case where the document was not found
        throw new NotFoundException(`Pokemon with ID ${id} not found`);
      }

      await this.prismaService.pokemon.delete({
        where: { id },
      });
      return {pokemon:existingPokemon, message:"Deleted Succssfuly"}
    } catch (error) {
      console.error('Error deletePokemon:', error);
      throw new InternalServerErrorException('Error deletePokemon :', error);
    }
  }

  convertExcelData(data: any) {
    return data.map((item: any) => {
      return {
        name: item['Name'],
        pokedexNumber: item['Pokedex Number'],
        imgName: item['Img name'].toString(),
        generation: item['Generation'],
        evolutionStage: item['Evolution stage']?.toString() || '',
        evolved: Boolean(item['Evolved']),
        familyId: item['FamilyID'],
        crossGen: Boolean(item['Cross Gen']),
        type1: item['Type 1'],
        type2: item['Type 2'],
        weather1: item['Weather 1'],
        weather2: item['Weather 2'],
        statTotal: item['STAT TOTAL'],
        atk: item['ATK'],
        def: item['DEF'],
        sta: item['STA'],
        legendary: Boolean(item['Legendary']),
        aquireable: Boolean(item['Aquireable']),
        spawns: Boolean(item['Spawns']),
        regional: Boolean(item['Regional']),
        raidable: item['Raidable'],
        hatchable: item['Hatchable'],
        shiny: Boolean(item['Shiny']),
        nest: Boolean(item['Nest']),
        new: Boolean(item['New']),
        notGettable: Boolean(item['Not-Gettable']),
        futureEvolve: Boolean(item['Future Evolve']),
        cp40: item['100% CP @ 40'],
        cp39: item['100% CP @ 39'],
      };
    });
  }
}
