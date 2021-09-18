import { ICreateUsersRefreshTokenDTO } from '@modules/accounts/dtos/ICreateUsersRefreshTokenDTO';
import { UserRefreshTokens } from '@modules/accounts/infra/typeorm/entities/UserRefreshTokens';

import { IUsersRefreshTokensRepository } from '../IUsersRefreshTokensRepository';

class UsersRefreshTokensRepositoryInMemory
  implements IUsersRefreshTokensRepository
{
  private usersRefreshTokens: UserRefreshTokens[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUsersRefreshTokenDTO): Promise<UserRefreshTokens> {
    const userRefreshToken = new UserRefreshTokens();
    Object.assign(userRefreshToken, {
      user_id,
      expires_date,
      refresh_token,
    });

    this.usersRefreshTokens.push(userRefreshToken);
    return userRefreshToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserRefreshTokens | undefined> {
    const userToken = this.usersRefreshTokens.find(
      (userRefreshToken) =>
        userRefreshToken.user_id === user_id &&
        userRefreshToken.refresh_token === refresh_token,
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.usersRefreshTokens.findIndex(
      (userRefreshToken) => userRefreshToken.id === id,
    );

    this.usersRefreshTokens.splice(userTokenIndex, 1);

    return;
  }

  async findByRefreshToken(
    refresh_token: string,
  ): Promise<UserRefreshTokens | undefined> {
    const userToken = this.usersRefreshTokens.find(
      (userRefreshToken) => userRefreshToken.refresh_token === refresh_token,
    );

    return userToken;
  }
}

export { UsersRefreshTokensRepositoryInMemory };
