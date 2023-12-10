import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../PrismaService';


@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) { }


}
