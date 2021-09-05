import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IPayload {
  email: string;
  password: string;
}

interface IAuthResponse {
  user: Pick<User, 'name' | 'email'>;
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IPayload): Promise<IAuthResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Email or password is incorrect!');
    }

    console.info('your secret is: ', process.env.JWT_SECRET);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      subject: user.email,
      expiresIn: '1d',
    });

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { AuthenticateUserUseCase };
