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
import { CreateUserUseCase } from './application/useCases/create-user.use-case';
import { DeleteUserUseCase } from './application/useCases/delete-user.use-case';
import { ActivateEmailUseCase } from './application/useCases/activate-email.use-case';
import { ResendEmailUseCase } from './application/useCases/resend-email.use-case';
import { UsersCommandHandlers } from './application/useCases';

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
    ...UsersCommandHandlers
  ],
  exports: [
    CryptoModule,
    UuidModule,
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    ...UsersCommandHandlers
  ],
})
export class UsersModule {
}
