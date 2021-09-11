import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(car: ICreateCarDTO): Promise<Car>;
}
