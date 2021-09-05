import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error('Token is not provided');
    }

    const [, token] = authHeader.split(' ');

    const { sub: userId } = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as ITokenPayload;
    console.log('userId', userId);
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new Error('User does not exists');
    }

    return next();
  } catch (err) {
    return response.status(401).json({ error: 'Token invalid' });
  }
}
