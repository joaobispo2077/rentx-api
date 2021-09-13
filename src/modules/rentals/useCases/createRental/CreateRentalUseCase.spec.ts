import { RentalsRepositoryInMemory } from '@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory';

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
});
