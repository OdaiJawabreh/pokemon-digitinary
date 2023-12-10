import { Module } from '@nestjs/common';
import {SharedModule} from "./Shared/shared.module";
import {UserModule} from "./Users/user.module"
import {AuthModule} from "./auth/auth.module"

@Module({
  imports: [SharedModule, UserModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
