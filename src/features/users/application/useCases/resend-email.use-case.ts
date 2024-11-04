import { BadRequestException } from '@nestjs/common';
import { EmailConfirmationModel } from '../../api/models/input/create-user.dto';
import { SETTINGS } from '../../../../core/settings/settings';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../infrastructure/users.repository';
import { UsersService } from '../users.service';


export class ResendEmailCommand {
  constructor(
    public email: string,
  ) {
  }

}

@CommandHandler(ResendEmailCommand)
export class ResendEmailUseCase
  implements ICommandHandler<ResendEmailCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersService: UsersService,
  ) {

  }

  async execute(command: ResendEmailCommand) {
    const isUserExists = await this.usersRepository.findUserByEmail(command.email);
    if (isUserExists.emailConfirmation.isConfirm) {
      throw new BadRequestException('Email already activate')
    }
    const emailConfirmation: EmailConfirmationModel = this.usersService.createEmailConfirmation(false);
    await this.usersService.sendActivationEmail(command.email, `${SETTINGS.PATH.API_URL}/?code=${emailConfirmation.confirmationCode as string}`);
    const updateUserInfo = await this.usersRepository.updateUserByResendEmail(
      isUserExists.id,
      emailConfirmation
    );
    return updateUserInfo;
  }
}
