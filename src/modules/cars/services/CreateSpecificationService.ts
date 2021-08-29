import { Specification } from '../models/Specification';
import { ISpecificationsRepository } from '../repositories/ISpecificationsRepository';

interface IPayload {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IPayload): Specification {
    const specification = this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationService };
