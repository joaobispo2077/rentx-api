import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';

const carsRepository = new CarsRepositoryInMemory();
const createCarUseCase = new CreateCarUseCase(carsRepository);

describe('Use case - Create Car', () => {
  it('shoud be able to create a new car', async () => {
    const car = {
      name: 'Uno',
      brand: 'Fiat',
      description: 'Carro de luxo',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'SUV',
    };

    const newCar = await createCarUseCase.execute(car);

    expect(newCar).toEqual(expect.objectContaining(car));
  });
});
