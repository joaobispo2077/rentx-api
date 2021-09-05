import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<User> {
    const newUser = this.repository.create({
      name,
      email,
      driver_license,
      password,
    });

    await this.repository.save(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({ email });
  }
}

export { UsersRepository };
