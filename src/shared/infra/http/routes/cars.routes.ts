import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImageUseCase/UploadCarImagesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const uploadCarImage = multer(uploadConfig.upload('./tmp/cars'));

const carsRoutes = Router();

const createCarController = new CreateCarController();
carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

const listAvailableCarsController = new ListAvailableCarsController();
carsRoutes.get('/avaialable', listAvailableCarsController.handle);

const createCarSpecificationController = new CreateCarSpecificationController();
carsRoutes.post(
  '/:id/specifications',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

const uploadCarImagesController = new UploadCarImagesController();
carsRoutes.post(
  '/:id/images',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
