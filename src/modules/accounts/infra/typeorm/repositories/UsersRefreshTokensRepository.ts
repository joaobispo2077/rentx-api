import { getRepository, Repository } from 'typeorm';

import { ICreateUsersRefreshTokenDTO } from '@modules/accounts/dtos/ICreateUsersRefreshTokenDTO';
import { IUsersRefreshTokensRepository } from '@modules/accounts/repositories/IUsersRefreshTokensRepository';

import { UserRefreshTokens } from '../entities/UserRefreshTokens';

class UsersRefreshTokensRepository implements IUsersRefreshTokensRepository {
  private repository: Repository<UserRefreshTokens>;

  constructor() {
    this.repository = getRepository(UserRefreshTokens);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserRefreshTokens | undefined> {
    const userToken = await this.repository.findOne({
      user_id,
      refresh_token,
    });

    return userToken;
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUsersRefreshTokenDTO): Promise<UserRefreshTokens> {
    const newRefreshToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(newRefreshToken);

    return newRefreshToken;
  }
}

export { UsersRefreshTokensRepository };
