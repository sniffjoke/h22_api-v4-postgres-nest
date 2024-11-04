import { Module } from '@nestjs/common';
import { DevicesController } from './api/devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesRepository } from './infrastructure/devices.repository';
import { TokensModule } from '../tokens/tokens.module';
import { UsersModule } from '../users/users.module';
import { DeviceEntity } from './domain/devices.entity';
import { DeleteOneDeviceUseCase } from './application/useCases/delete-one-device.use-case';
import { GetDevicesUseCase } from './application/useCases/get-devices.use-case';
import { DeleteAllDevicesUseCase } from './application/useCases/delete-all-devices.use-case';
import { DevicesCommandHandlers } from './application/useCases';

@Module({
  imports: [
    UsersModule,
    TokensModule,
    TypeOrmModule.forFeature([DeviceEntity]),
  ],
  controllers: [DevicesController],
  providers: [
    DevicesRepository,
    ...DevicesCommandHandlers
  ],
  exports: [
    DevicesRepository,
  ]
})
export class DevicesModule {}
