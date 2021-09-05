import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);
    const newUser = await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (newUser as any).password;

    return response.status(201).json(newUser);
  }
}

export { CreateUserController };
