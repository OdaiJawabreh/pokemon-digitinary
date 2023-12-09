import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {SharedModule} from '../Shared/shared.module'
@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[SharedModule]
})
export class UserModule {}
