import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';

class ShowUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProfileUserUseCase = container.resolve(ShowUserProfileUseCase);

    const user = await showProfileUserUseCase.execute(id);

    return response.json(user);
  }
}

export { ShowUserProfileController };
