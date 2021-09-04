import { inject, injectable } from 'tsyringe';

import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

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
      throw new Error('Specification already exists');
    }

    const specification = this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
