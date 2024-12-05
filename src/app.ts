// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import errorHandler from './middlewares/errorHandler';
import userRoutes from './routes/user/userRoutes';
import roleRoutes from './routes/role/roleRoutes';
import userRoleRoutes from './routes/role/userRoleRoutes';
import invoiceRoutes from './routes/invoice/invoiceRoutes';
import paymentRoutes from './routes/payment/paymentRoutes';
import invoiceDetailRoutes from './routes/invoice/invoiceDetailRoutes';

const app: Application = express();

// Middlewares globales
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// swagger
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use(userRoutes);
app.use(roleRoutes);
app.use(userRoleRoutes);
app.use(invoiceRoutes);
app.use(paymentRoutes);
app.use(invoiceDetailRoutes);

// Middleware de manejo de errores
app.use(errorHandler);
app.get('/', (_req, res) => {
  res.send('Api Itp');
});
export default app;
