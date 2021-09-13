import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as Express.Multer.File[];

    const filenames = images.map((image) => image.filename);

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const newImages = await uploadCarImagesUseCase.execute({
      car_id: id,
      image_names: filenames,
    });

    return response.status(201).json(newImages);
  }
}

export { UploadCarImagesController };
