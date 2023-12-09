import { Module } from '@nestjs/common';
import {SharedModule} from "./Shared/shared.module";
import {UserModule} from "./Users/user.module"

@Module({
  imports: [SharedModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
