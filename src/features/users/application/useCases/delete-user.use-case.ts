import { UsersRepository } from '../../infrastructure/users.repository';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class DeleteUserCommand {
  constructor(
    public id: string,
  ) {
  }

}

@CommandHandler(DeleteUserCommand)
export class DeleteUserUseCase
  implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) {

  }

  async execute(command: DeleteUserCommand) {
    const deleteUser = await this.usersRepository.deleteUserById(command.id);
    return deleteUser;
  }
}
