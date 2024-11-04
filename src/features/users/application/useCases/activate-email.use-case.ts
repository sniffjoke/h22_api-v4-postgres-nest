import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../infrastructure/users.repository';

export class ActivateEmailCommand {
  constructor(
    public code: string,
  ) {
  }

}

@CommandHandler(ActivateEmailCommand)
export class ActivateEmailUseCase
  implements ICommandHandler<ActivateEmailCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {

  }

  async execute(command: ActivateEmailCommand) {
    const isUserExists = await this.usersRepository.findUserByCode(command.code);
    if (isUserExists.emailConfirmation.isConfirm) {
      throw new BadRequestException('Code already activate');
    }
    const updateUserInfo = await this.usersRepository.updateUserByActivateEmail(
      isUserExists.id,
    );
    return updateUserInfo;
  }
}
