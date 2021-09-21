import { classToClass } from 'class-transformer';

import { IUserDTO } from '../dtos/IUserDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
    getAvatarUrl,
  }: User): IUserDTO {
    const user = classToClass({
      id,
      name,
      email,
      avatar,
      driver_license,
      getAvatarUrl,
    });

    return user;
  }
}

export { UserMap };
