import { Specification } from '../../models/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find(
      (specification) => specification.name === name,
    );

    return specification;
  }
  private specifications: Specification[] = [];

  create({ name, description }: ICreateSpecificationDTO): Specification {
    const specification = new Specification(name, description, new Date());
    this.specifications.push(specification);

    return specification;
  }
}

export { SpecificationsRepository };
