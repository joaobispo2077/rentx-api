import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/containers/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

const dayjsDateProvider = new DayjsDateProvider();

const rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
const carsRepositoryInMemory = new CarsRepositoryInMemory();

const createRentalUseCase = new CreateRentalUseCase(
  rentalsRepositoryInMemory,
  dayjsDateProvider,
  carsRepositoryInMemory,
);

describe('Use case - Create Rental', () => {
  const dateTomorrow = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory.clear();
  });

  it('should be able to create a new Rental', async () => {
    const newCar = await carsRepositoryInMemory.create({
      name: 'Ferrari',
      brand: 'Ferrari',
      license_plate: 'ABC123',
      daily_rate: 100,
      fine_amount: 10,
      description: 'Ferrari',
      category_id: 'i',
    });

    const newRental = await createRentalUseCase.execute({
      user_id: 'user_id',
      car_id: newCar.id,
      expected_return_date: dateTomorrow,
    });

    expect(newRental).toHaveProperty('id');
  });

  it('should not be able to create a new Rental with expected return date minor than 24 hours', async () => {
    const newCar = await carsRepositoryInMemory.create({
      name: 'Ferrari',
      brand: 'Ferrari',
      license_plate: 'ABC123',
      daily_rate: 100,
      fine_amount: 10,
      description: 'Ferrari',
      category_id: 'i',
    });

    const rental = {
      user_id: 'user_id',
      car_id: newCar.id,
      expected_return_date: new Date(),
    };

    await expect(createRentalUseCase.execute(rental)).rejects.toEqual(
      new AppError('Expected return date must be at least 24 hours', 422),
    );
  });

  it('should not be able to create a new rental if there is another open rental to the same user', async () => {
    const newCar = await carsRepositoryInMemory.create({
      name: 'Ferrari',
      brand: 'Ferrari',
      license_plate: 'ABC123',
      daily_rate: 100,
      fine_amount: 10,
      description: 'Ferrari',
      category_id: 'i',
    });

    const otherCar = await carsRepositoryInMemory.create({
      name: 'Lamborghini',
      brand: 'Lamborghini',
      license_plate: 'ABC123',
      daily_rate: 100,
      fine_amount: 10,
      description: 'Lamborghini',
      category_id: 'i',
    });

    await createRentalUseCase.execute({
      user_id: 'user_id',
      car_id: newCar.id,
      expected_return_date: dateTomorrow,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'user_id',
        car_id: otherCar.id,
        expected_return_date: dateTomorrow,
      }),
    ).rejects.toEqual(new AppError('User is not available', 409));
  });

  it('should not be able to create a new rental if there is another open rental to the same car', async () => {
    const newCar = await carsRepositoryInMemory.create({
      name: 'Ferrari',
      brand: 'Ferrari',
      license_plate: 'ABC123',
      daily_rate: 100,
      fine_amount: 10,
      description: 'Ferrari',
      category_id: 'i',
    });

    await createRentalUseCase.execute({
      user_id: 'user_id',
      car_id: newCar.id,
      expected_return_date: dateTomorrow,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'user_id2',
        car_id: newCar.id,
        expected_return_date: dateTomorrow,
      }),
    ).rejects.toEqual(new AppError('Car is not available', 409));
  });
});
