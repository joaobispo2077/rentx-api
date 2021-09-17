import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRefreshTokensRepository } from '@modules/accounts/repositories/IUsersRefreshTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IDateProvider } from '@shared/containers/providers/DateProvider/IDateProvider';

interface IPayload {
  email: string;
  password: string;
}

interface IAuthResponse {
  user: Pick<User, 'name' | 'email'>;
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersRefreshTokensRepository')
    private usersRefreshTokenRepository: IUsersRefreshTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IPayload): Promise<IAuthResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError('Email or password is incorrect.', 401);
    }

    const token = jwt.sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRES_IN as string,
    });

    const refresh_token = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      {
        subject: user.id,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,
      },
    );

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS as string),
    );

    await this.usersRefreshTokenRepository.create({
      user_id: user.id as string,
      expires_date: refreshTokenExpiresDate,
      refresh_token,
    });

    const authResponse: IAuthResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refreshToken: refresh_token,
    };

    return authResponse;
  }
}

export { AuthenticateUserUseCase };
