import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

const carsRepository = new CarsRepositoryInMemory();
const listAvailableCarUseCase = new ListAvailableCarsUseCase(carsRepository);

describe('Use case - List available cars', () => {
  beforeEach(async () => {
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

    const cars = await listAvailableCarUseCase.execute({});

    expect(cars.length).toBe(1);
  });

  it('should be able to filter cars by brand', async () => {
    const car = {
      name: 'T5',
      brand: 'Tesla',
      description: 'Carro com bateria',
      daily_rate: 60,
      license_plate: 'ABC-1236',
      fine_amount: 60,
      category_id: 'be81e7b3-a9b0-453d-ac92-36909c7361bf',
    };
    await carsRepository.create(car);

    const cars = await listAvailableCarUseCase.execute({
      brand: car.brand,
    });

    expect(cars.length).toBe(1);
  });

  it('should be able to filter cars by name', async () => {
    const car = {
      name: 'T5',
      brand: 'Tesla',
      description: 'Carro com bateria',
      daily_rate: 60,
      license_plate: 'ABC-1236',
      fine_amount: 60,
      category_id: 'be81e7b3-a9b0-453d-ac92-36909c7361bf',
    };
    await carsRepository.create(car);

    const cars = await listAvailableCarUseCase.execute({
      name: car.name,
    });

    expect(cars.length).toBe(1);
  });

  it('should be able to filter cars by category id', async () => {
    const car = {
      name: 'T5',
      brand: 'Tesla',
      description: 'Carro com bateria',
      daily_rate: 60,
      license_plate: 'ABC-1236',
      fine_amount: 60,
      category_id: 'be81e7b3-a9b0-453d-ac92-36909c7361bf',
    };
    await carsRepository.create(car);

    const cars = await listAvailableCarUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars.length).toBe(1);
  });
});
