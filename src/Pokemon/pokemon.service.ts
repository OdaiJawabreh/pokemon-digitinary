import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import * as XLSX from 'xlsx';
import { PrismaService } from '../PrismaService';
import { Pokemon } from '@prisma/client';
import { CreatePokemonDto } from './DTO/create-pokemon.dto';
@Injectable()
export class PokemonService {
  constructor(private prismaService: PrismaService) {}

  async importFromExcel() {
    try {
      const filePath = 'Pokemon Go.xlsx';
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const pokemonData = XLSX.utils.sheet_to_json(sheet);
      const data = this.convertExcelData(pokemonData);

      return await this.prismaService.pokemon.createMany({data});
    } catch (error) {
      console.error('Error importing data from Excel:', error);
      throw new BadRequestException('Error importing data from Excel:', error);
    }
  }
  convertExcelData(data: any) {
    return data.map((item: any) => {
      console.log(item['Evolution Stage']?.toString());
            
      return {
        name: item['Name'],
        pokedexNumber: item['Pokedex Number'],
        imgName: item['Img name'].toString(),
        generation: item['Generation'],
        evolutionStage: item['Evolution Stage']?.toString() || "",
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
