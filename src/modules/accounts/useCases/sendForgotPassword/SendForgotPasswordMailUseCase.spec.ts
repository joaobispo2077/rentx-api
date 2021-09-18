import { UsersRefreshTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRefreshTokensRepositoryInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { DayjsDateProvider } from '@shared/containers/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/containers/providers/MailProvider/in-memory/MailProviderInMemory';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

const usersRepositoryInMemory = new UsersRepositoryInMemory();
const usersTokensRepositoryInMemory =
  new UsersRefreshTokensRepositoryInMemory();
const dateProvider = new DayjsDateProvider();
const mailProvider = new MailProviderInMemory();

const sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
  usersRepositoryInMemory,
  usersTokensRepositoryInMemory,
  dateProvider,
  mailProvider,
);

describe('Use case - send forgot mail', () => {
  it('should be able to sent a forgot password mail to user', async () => {
    jest.spyOn(mailProvider, 'sendMailWithTemplate');

    const user = await usersRepositoryInMemory.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
      driver_license: '123456789',
    });

    await sendForgotPasswordMailUseCase.execute(user.email);

    expect(mailProvider.sendMailWithTemplate).toHaveBeenCalledTimes(1);
  });
});
