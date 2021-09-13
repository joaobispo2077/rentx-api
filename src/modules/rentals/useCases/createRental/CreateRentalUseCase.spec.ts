import { RentalsRepositoryInMemory } from '@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

const rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
const createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);

describe('Use case - Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory.clear();
  });

  it('should be able to create a new Rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: 'user_id',
      car_id: 'car_id',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if there is another open rental to the same user', async () => {
    await createRentalUseCase.execute({
      user_id: 'user_id',
      car_id: 'car_id1',
      expected_return_date: new Date(),
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'user_id',
        car_id: 'car_id2',
        expected_return_date: new Date(),
      }),
    ).rejects.toEqual(new AppError('User is not available', 409));
  });
});
