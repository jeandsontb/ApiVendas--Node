import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrdersController';
import isAuthenticaded from '@shared/http/middlewares/isAuthenticaded';

const ordersRouter = Router();
const orderController = new OrdersController();


ordersRouter.use(isAuthenticaded);
ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    }
  }),
  orderController.show
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.number().required(),
      products: Joi.required(),
    }
  }),
  orderController.create
);

export default ordersRouter;
