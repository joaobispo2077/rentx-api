import { Specification } from '../infra/typeorm/entities/Specification';

export interface ICreateCarDTO {
  id?: string;
  name: string;
  brand: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  category_id: string;
  specifications?: Specification[];
}
