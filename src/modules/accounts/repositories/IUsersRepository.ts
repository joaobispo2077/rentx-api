import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<User>;
}

export { IUsersRepository };
