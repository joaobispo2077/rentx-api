import jwt from 'jsonwebtoken';
import { inject } from 'tsyringe';

import { IUsersRefreshTokensRepository } from '@modules/accounts/repositories/IUsersRefreshTokensRepository';
import { IDateProvider } from '@shared/containers/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface ITokenPayload {
  sub: string;
  email: string;
}

class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersRefreshTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(refreshToken: string): Promise<string> {
    const { sub: user_id, email } = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
    ) as ITokenPayload;

    const userRefreshToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        refreshToken,
      );

    if (!userRefreshToken) {
      throw new AppError('Refresh token was not found.', 404);
    }

    await this.usersTokensRepository.deleteById(userRefreshToken.id);

    const refresh_token = jwt.sign(
      {
        email,
      },
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      {
        subject: user_id,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,
      },
    );

    const expires_date = this.dateProvider.addDays(
      Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS as string),
    );

    await this.usersTokensRepository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
