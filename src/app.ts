import express from 'express';
import { RegisterRoutes } from '../build/routes';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../build/swagger.json';
import { errorHandler } from './auth/middleware/error.handler';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();

app.use(express.json());

RegisterRoutes(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
