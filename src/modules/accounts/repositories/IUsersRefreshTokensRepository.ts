import { ICreateUsersRefreshTokenDTO } from '../dtos/ICreateUsersRefreshTokenDTO';
import { UserRefreshTokens } from '../infra/typeorm/entities/UserRefreshTokens';

export interface IUsersRefreshTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUsersRefreshTokenDTO): Promise<UserRefreshTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserRefreshTokens | undefined>;
  deleteById(id: string): Promise<void>;
}
