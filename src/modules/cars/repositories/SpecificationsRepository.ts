import { Specification } from '../models/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  create({ name, description }: ICreateSpecificationDTO): Specification {
    const specification = new Specification(name, description, new Date());
    this.specifications.push(specification);

    return specification;
  }
}

export { SpecificationsRepository };
