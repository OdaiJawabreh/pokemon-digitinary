import { Module } from '@nestjs/common';
import {SharedModule} from "./Shared/shared.module";
import {UserModule} from "./Users/user.module"
import {AuthModule} from "./auth/auth.module"
import { PokemonModule } from './Pokemon/pokemon.module';

@Module({
  imports: [SharedModule, UserModule,AuthModule, PokemonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
