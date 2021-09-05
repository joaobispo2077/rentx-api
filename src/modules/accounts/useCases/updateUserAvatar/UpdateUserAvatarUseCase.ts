import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IPayload {
  userId: string;
  avatar: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ userId, avatar }: IPayload): Promise<void> {
    console.log('executing UpdateUserAvatarUseCase...', userId, avatar);
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found');
    }

    user.avatar = avatar;

    await this.usersRepository.create(user);

    return;
  }
}

export { UpdateUserAvatarUseCase };
