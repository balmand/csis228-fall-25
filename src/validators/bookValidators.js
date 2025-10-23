
import {body, param} from 'express-validator';

export const idParam = [param('id')
    .isInt({gt: 0}).withMessage('id must be an integer')
];

export const upsertBook = [
    body('title').isString().isLength({min: 1, max: 255}).withMessage('title must be a string between 1-255 characters'),
    body('author').isString().isLength({min: 1, max: 255}).withMessage('author must be a string between 1-255 characters'),
    body('year').isInt({min: 1000, max: 3000}).withMessage('year must be an integer between 1000-3000'),
    body('price').isFloat({min: 0}).withMessage('price must be a positive number'),
]