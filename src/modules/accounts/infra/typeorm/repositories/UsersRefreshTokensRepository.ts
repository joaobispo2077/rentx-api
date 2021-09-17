import { getRepository, Repository } from 'typeorm';

import { ICreateUsersRefreshTokenDTO } from '@modules/accounts/dtos/ICreateUsersRefreshTokenDTO';
import { IUsersRefreshTokensRepository } from '@modules/accounts/repositories/IUsersRefreshTokensRepository';

import { UserRefreshTokens } from '../entities/UserRefreshTokens';

class UsersRefreshTokensRepository implements IUsersRefreshTokensRepository {
  private repository: Repository<UserRefreshTokens>;

  constructor() {
    this.repository = getRepository(UserRefreshTokens);
  }

  async create({
    user_id,
    expires_date,
    created_at,
  }: ICreateUsersRefreshTokenDTO): Promise<UserRefreshTokens> {
    const newRefreshToken = this.repository.create({
      user_id,
      expires_date,
      created_at,
    });

    await this.repository.save(newRefreshToken);

    return newRefreshToken;
  }
}

export { UsersRefreshTokensRepository };
