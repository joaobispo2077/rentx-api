import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

const carsRepository = new CarsRepositoryInMemory();
const createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
  carsRepository,
);

describe('Use case - Create car pecification', () => {
  it('should not be able to add a new specification to a car that not exists', async () => {
    const car_id = '1234';
    const specifications = ['56465'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications,
      }),
    ).rejects.toEqual(new AppError('Car was not found', 404));
  });
});
