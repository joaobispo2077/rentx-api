import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

const carsRepository = new CarsRepositoryInMemory();
const specificationsRepository = new SpecificationsRepositoryInMemory();

const createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
  carsRepository,
  specificationsRepository,
);

describe('Use case - Create car pecification', () => {
  it('should not be able to add a new specification to a car that not exists', async () => {
    const car_id = '1234';
    const specifications = ['56465'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specification_ids: specifications,
      }),
    ).rejects.toEqual(new AppError('Car was not found', 404));
  });

  it('should  able to add a new specification to a car', async () => {
    const newCar = await carsRepository.create({
      name: 'Uno',
      brand: 'Fiat',
      description: 'Carro de luxo',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      category_id: 'SUV',
    });

    const newSpecification = await specificationsRepository.create({
      name: 'Test',
      description: 'test',
    });

    const specification_ids = [newSpecification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: newCar.id,
      specification_ids: specification_ids,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
