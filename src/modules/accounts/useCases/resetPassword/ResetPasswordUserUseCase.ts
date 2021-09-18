import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IUsersRefreshTokensRepository } from '@modules/accounts/repositories/IUsersRefreshTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IDateProvider } from '@shared/containers/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersRefreshTokensRepository')
    private usersRefreshTokenRepository: IUsersRefreshTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ token, password }: IPayload): Promise<void> {
    const recoveredToken =
      await this.usersRefreshTokenRepository.findByRefreshToken(token);

    if (!recoveredToken) {
      throw new AppError('Token was not found', 404);
    }

    const isGeneratedTokenBeforeNow =
      this.dateProvider.isStartDateBeforeThanDate(
        recoveredToken.created_at,
        this.dateProvider.getDateNow(),
      );

    if (isGeneratedTokenBeforeNow) {
      throw new AppError('Token expired!', 401);
    }

    const { user_id } = recoveredToken;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User was not found!', 404);
    }

    user.password = await hash(password, 8);
    await this.usersRepository.create(user);

    await this.usersRefreshTokenRepository.deleteById(recoveredToken.id);

    return;
  }
}

export { ResetPasswordUserUseCase };
