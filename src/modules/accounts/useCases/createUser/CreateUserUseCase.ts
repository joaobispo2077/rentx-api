import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const isUserAlreadyExists = await this.usersRepository.findByEmail(email);

    if (isUserAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    return await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
