import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);

const devolutionRentalController = new DevolutionRentalController();
rentalsRoutes.put(
  '/:rentalId/devolution',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

const listRentalsByUserController = new ListRentalsByUserController();
rentalsRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle,
);
export { rentalsRoutes };
