import { ICreateUsersRefreshTokenDTO } from '../dtos/ICreateUsersRefreshTokenDTO';
import { UserRefreshTokens } from '../infra/typeorm/entities/UserRefreshTokens';

export interface IUsersRefreshTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUsersRefreshTokenDTO): Promise<UserRefreshTokens>;
}
