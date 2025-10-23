import {Router} from 'express'
import { OrderRepository } from '../domain/repositories/OrderRepository.js';
import { OrderService } from '../services/OrderService.js';
import { OrderController } from '../controllers/OrderController.js';

import{idParam, upsertOrder} from '../validators/orderValidators.js';


/**
 * Dependency injection
 */
const repo = new OrderRepository();
const service = new OrderService(repo);
const controller = new OrderController(service);

export const orderRoutes = Router();

orderRoutes.get('/', controller.list);
// if you change the router name place it on top
orderRoutes.get('/order-details', controller.getAllWithDetails);
orderRoutes.get('/:id', idParam, controller.get);
orderRoutes.put('/:id', [...idParam, upsertOrder], controller.update);
orderRoutes.post('/', upsertOrder, controller.create);
orderRoutes.delete('/:id', idParam, controller.delete);

