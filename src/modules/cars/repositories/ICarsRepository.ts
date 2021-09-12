import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(car: ICreateCarDTO): Promise<Car>;
  findByLincensePlate(license_plate: string): Promise<Car | undefined>;
  findAvaiable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]>;
}
