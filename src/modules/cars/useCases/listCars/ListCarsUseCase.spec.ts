import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

const carsRepository = new CarsRepositoryInMemory();
const listCarUseCase = new ListCarsUseCase(carsRepository);

describe('Use case - List cars', () => {
  beforeAll(async () => {
    await carsRepository.clear();
  });

  it('should be able to list all available cars', async () => {
    await carsRepository.create({
      name: 'T5',
      brand: 'Tesla',
      description: 'Carro com bateria',
      daily_rate: 60,
      license_plate: 'ABC-1236',
      fine_amount: 60,
      category_id: 'be81e7b3-a9b0-453d-ac92-36909c7361bf',
    });

    const cars = await listCarUseCase.execute();

    expect(cars.length).toBe(1);
  });
});
