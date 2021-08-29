import { Specification } from '../models/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create: ({ name, description }: ICreateSpecificationDTO) => Specification;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
