import { ICreateUsersRefreshTokenDTO } from '../dtos/ICreateUsersRefreshTokenDTO';
import { UserRefreshTokens } from '../infra/typeorm/entities/UserRefreshTokens';

export interface IUsersRefreshTokensRepository {
  create({
    user_id,
    expires_date,
    created_at,
  }: ICreateUsersRefreshTokenDTO): Promise<UserRefreshTokens>;
}
