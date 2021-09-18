import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { IUsersRefreshTokensRepository } from '@modules/accounts/repositories/IUsersRefreshTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IDateProvider } from '@shared/containers/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/containers/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';
@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersRefreshTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User was not found!', 404);
    }

    const token = uuid();
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id as string,
      expires_date,
    });

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      body: `O link para a recuperação da senha é http://localhost/forgot?token=${token}`,
    });
  }
}

export { SendForgotPasswordMailUseCase };
