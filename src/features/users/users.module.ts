import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersRepository } from './infrastructure/users.repository';
import { UsersController } from './api/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UuidModule } from 'nestjs-uuid';
import { CryptoModule } from '../../core/modules/crypto/crypto.module';
import { UsersQueryRepository } from './infrastructure/users.query-repositories';
import { UserEntity } from './domain/user.entity';
import { EmailConfirmationEntity } from './domain/email-confirmation.entity';
import { CreateUserCommand, CreateUserUseCase } from './application/useCases/create-user.use-case';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { DeleteUserUseCase } from './application/useCases/delete-user.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, EmailConfirmationEntity]),
    CryptoModule,
    UuidModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    CreateUserUseCase,
    DeleteUserUseCase
  ],
  exports: [
    CryptoModule,
    UuidModule,
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    CreateUserUseCase,
    DeleteUserUseCase
  ],
})
export class UsersModule {
}
