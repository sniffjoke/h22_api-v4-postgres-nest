import { Module } from "@nestjs/common";
import { AuthController } from "./api/auth.controller";
import { UsersModule } from "../users/users.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensModule } from '../tokens/tokens.module';
import { DevicesModule } from '../devices/devices.module';
import { LoginUseCase } from './application/useCases/login.use-case';
import { GetMeUseCase } from './application/useCases/get-me.use-case';
import { RefreshTokenUseCase } from './application/useCases/refresh-token.use-case';
import { LogoutUseCase } from './application/useCases/logout.use-case';

@Module({
  imports: [
    DevicesModule,
    TokensModule,
    UsersModule,
    TypeOrmModule.forFeature([]),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    GetMeUseCase,
    RefreshTokenUseCase,
    LogoutUseCase
  ],
  exports: [
    LoginUseCase,
    GetMeUseCase,
    RefreshTokenUseCase,
    LogoutUseCase
  ]
})
export class AuthModule {}
