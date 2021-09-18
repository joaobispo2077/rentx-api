import { Router } from 'express';

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPassword/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPassword/SendForgotPasswordMailController';

const passwordsRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
passwordsRoutes.post('/:email/forgot', sendForgotPasswordMailController.handle);

const resetPasswordUserController = new ResetPasswordUserController();
passwordsRoutes.post('/:email/reset', resetPasswordUserController.handle);

export { passwordsRoutes };
