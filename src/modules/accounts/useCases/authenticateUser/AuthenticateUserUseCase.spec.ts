import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const usersRepository = new UsersRepositoryInMemory();
const createUserUseCase = new CreateUserUseCase(usersRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

describe('Use case - AuthenticateUserUseCase', () => {
  beforeEach(() => {
    usersRepository.clear();
  });

  it('should be able to authenticate an user with correct credentials', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
      driver_license: '123456789',
    };

    await createUserUseCase.execute(user);

    const payload = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(payload).toHaveProperty('token');
  });

  it('should not be able to authenticate an user with wrong credentials', async () => {
    const user: ICreateUserDTO = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'asdflkjsadfkjsdafjkl',
      driver_license: '123456789',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'ABC',
      }),
    ).rejects.toEqual(new AppError('Email or password is incorrect.', 401));
  });

  it('should not be able to authenticate a non existent  user', async () => {
    const user = {
      email: 'john@doe.com',
      password: 'asdflkjsadfkjsdafjkl',
    };

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toEqual(new AppError('User not found', 404));
  });
});
