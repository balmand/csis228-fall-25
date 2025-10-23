import {Router} from 'express'
import { BookRepository } from '../domain/repositories/BookRepository.js';
import { BookService } from '../services/BookService.js';
import { BookController } from '../controllers/BookController.js';

import{idParam, upsertBook} from '../validators/bookValidators.js';


/**
 * Dependency injection
 */
const repo = new BookRepository();
const service = new BookService(repo);
const controller = new BookController(service);

export const bookRoutes = Router();

bookRoutes.get('/', controller.list);
bookRoutes.get('/:id', idParam, controller.get);
bookRoutes.put('/:id', [...idParam, upsertBook], controller.update);
bookRoutes.post('/', upsertBook, controller.create);
bookRoutes.delete('/:id', idParam, controller.delete);

