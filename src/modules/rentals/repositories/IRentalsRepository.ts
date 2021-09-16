import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

import { Rental } from '../infra/typeorm/entities/Rental';

export interface IRentalsRepository {
  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCarId(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUserId(user_id: string): Promise<Rental | undefined>;
  findById(id: string): Promise<Rental | undefined>;
}
