import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRefreshTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRefreshTokensRepositoryInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { DayjsDateProvider } from '@shared/containers/providers/DateProvider/implementations/DayjsDateProvider';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const usersRepositoryInMemory = new UsersRepositoryInMemory();
const createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
const usersRefreshTokensRepositoryInMemory =
  new UsersRefreshTokensRepositoryInMemory();
const dayjsDateProvider = new DayjsDateProvider();

const authenticateUserUseCase = new AuthenticateUserUseCase(
  usersRepositoryInMemory,
  usersRefreshTokensRepositoryInMemory,
  dayjsDateProvider,
);

describe('Use case - AuthenticateUserUseCase', () => {
  beforeEach(() => {
    usersRepositoryInMemory.clear();
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
