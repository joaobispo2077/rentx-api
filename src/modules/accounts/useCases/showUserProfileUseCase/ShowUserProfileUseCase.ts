import { inject, injectable } from 'tsyringe';

import { IUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { UserMap } from '@modules/accounts/mappers/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ShowUserProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string): Promise<IUserDTO> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User was not found', 404);
    }

    return UserMap.toDTO(user);
  }
}

export { ShowUserProfileUseCase };
