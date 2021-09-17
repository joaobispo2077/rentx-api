import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const oldRefreshToken =
      request.body.token ||
      request.headers['x-refresh-token'] ||
      request.query.token ||
      '';

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
    const auth = await refreshTokenUseCase.execute(oldRefreshToken);

    return response.json({ ...auth });
  }
}

export { RefreshTokenController };
