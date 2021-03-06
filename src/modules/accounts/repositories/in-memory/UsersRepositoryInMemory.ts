import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create(user: ICreateUserDTO): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, {
      ...user,
    });
    this.users.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async clear(): Promise<void> {
    this.users.length = 0;
    return;
  }
}

export { UsersRepositoryInMemory };
