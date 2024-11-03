import { CreateUserDto, EmailConfirmationModel } from '../../api/models/input/create-user.dto';
import { SETTINGS } from '../../../../core/settings/settings';
import { CryptoService } from '../../../../core/modules/crypto/application/crypto.service';
import { UsersService } from '../users.service';
import { UsersRepository } from '../../infrastructure/users.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class CreateUserCommand {
  constructor(
    public createUserDto: CreateUserDto,
    public isConfirm: boolean,
  ) {
  }

}

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase
  implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
  ) {

  }

  async execute(command: CreateUserCommand) {
    const isUserExists = await this.usersRepository.checkIsUserExists(command.createUserDto.login, command.createUserDto.email);
    const emailConfirmationDto: EmailConfirmationModel = this.usersService.createEmailConfirmation(command.isConfirm);
    if (!command.isConfirm) {
      await this.usersService.sendActivationEmail(command.createUserDto.email, `${SETTINGS.PATH.API_URL}/?code=${emailConfirmationDto.confirmationCode as string}`);
    }
    const hashPassword = await this.cryptoService.hashPassword(command.createUserDto.password);
    const newUserData = { ...command.createUserDto, password: hashPassword };
    const userSave = await this.usersRepository.createUser(newUserData, emailConfirmationDto);
    return userSave.id;
  }
}
