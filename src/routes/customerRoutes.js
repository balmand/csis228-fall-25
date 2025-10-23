import {Router} from 'express'
import { CustomerRepository } from '../domain/repositories/CustomerRepository.js';
import { CustomerService } from '../services/CustomerService.js';
import { CustomerController } from '../controllers/CustomerController.js';

import{idParam, upsertCustomer} from '../validators/customerValidators.js';


/**
 * Dependency injection
 */
const repo = new CustomerRepository();
const service = new CustomerService(repo);
const controller = new CustomerController(service);

export const customerRoutes = Router();

customerRoutes.get('/', controller.list);
customerRoutes.get('/:id', idParam, controller.get);
customerRoutes.put('/:id', [...idParam, upsertCustomer], controller.update);
customerRoutes.post('/', upsertCustomer, controller.create);
customerRoutes.delete('/:id', idParam, controller.delete);

