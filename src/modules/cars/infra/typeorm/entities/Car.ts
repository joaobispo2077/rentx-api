// import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
// @Entity('cars')
class Car {
  // @PrimaryColumn()
  id: string;

  name: string;
  brand: string;
  description: string;
  daily_rate: number;
  avaiable: boolean;
  license_plate: string;
  fine_amount: number;
  category_id: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Car };
