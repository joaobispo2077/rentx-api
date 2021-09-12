import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IPayload {
  category_id?: string;
  brand?: string;
  name?: string;
}
class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ brand, category_id, name }: IPayload): Promise<Car[]> {
    const cars = await this.carsRepository.findAvaiable(
      brand,
      category_id,
      name,
    );

    return cars;
  }
}

export { ListCarsUseCase };
