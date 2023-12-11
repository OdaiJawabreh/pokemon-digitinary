import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule } from 'src/Shared/shared.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[SharedModule]
})
export class AuthModule {}
