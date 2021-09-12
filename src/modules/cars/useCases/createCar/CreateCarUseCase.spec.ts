import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

const carsRepository = new CarsRepositoryInMemory();
const createCarUseCase = new CreateCarUseCase(carsRepository);

describe('Use case - Create Car', () => {
  beforeEach(async () => {
    await carsRepository.clear();
  });

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

  it('should not be able to create a car with a license plate that already exists', async () => {
    const car = {
      name: 'Uno',
      brand: 'Fiat',
      description: 'Carro de luxo',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'SUV',
    };

    await createCarUseCase.execute(car);

    await expect(createCarUseCase.execute(car)).rejects.toEqual(
      new AppError('Car already exists!', 409),
    );
  });

  it('should be able to create a car with avaiability as true by default', async () => {
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
    expect(newCar).toHaveProperty('available', true);
  });

  // it('should not be able a user non admin to create a car', async () => {
  //   //
  // });
});
