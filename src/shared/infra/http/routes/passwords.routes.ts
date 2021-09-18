import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPassword/SendForgotPasswordMailController';

const passwordsRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
passwordsRoutes.post('/:email/forgot', sendForgotPasswordMailController.handle);

export { passwordsRoutes };
