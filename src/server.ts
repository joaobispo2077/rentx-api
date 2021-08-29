import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { routes } from './routes';
import swaggerFile from './swagger.json';

const app = express();
app.use(express.json());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running at por ${PORT}`));
