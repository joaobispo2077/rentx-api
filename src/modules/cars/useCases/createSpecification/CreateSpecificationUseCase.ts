import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

interface IPayload {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository,
  ) {}

  async execute({ name, description }: IPayload): Promise<Specification> {
    const isSpecificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (isSpecificationAlreadyExists) {
      throw new AppError('Specification already exists', 409);
    }

    const specification = this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
