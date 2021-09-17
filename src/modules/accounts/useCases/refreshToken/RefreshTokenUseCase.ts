import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRefreshTokensRepository } from '@modules/accounts/repositories/IUsersRefreshTokensRepository';
import { IDateProvider } from '@shared/containers/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface ITokenPayload {
  sub: string;
  email: string;
}

interface IRefreshTokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersRefreshTokensRepository')
    private usersTokensRepository: IUsersRefreshTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(refreshToken: string): Promise<IRefreshTokenResponse> {
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

    const token = jwt.sign({}, process.env.JWT_SECRET as string, {
      subject: user_id,
      expiresIn: process.env.JWT_EXPIRES_IN as string,
    });

    return { refresh_token, token };
  }
}

export { RefreshTokenUseCase };
