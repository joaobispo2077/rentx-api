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

    const token = jwt.sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: '1d',
    });

    const authResponse: IAuthResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return authResponse;
  }
}

export { AuthenticateUserUseCase };
