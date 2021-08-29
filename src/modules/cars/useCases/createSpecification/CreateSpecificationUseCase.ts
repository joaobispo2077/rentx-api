import { Specification } from '../../models/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IPayload {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IPayload): Specification {
    const isSpecificationAlreadyExists =
      this.specificationRepository.findByName(name);

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
