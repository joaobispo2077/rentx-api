import { IUserDTO } from '../dtos/IUserDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({ id, name, email, avatar }: User): IUserDTO {
    return {
      id,
      name,
      email,
      avatar,
    };
  }
}

export { UserMap };
