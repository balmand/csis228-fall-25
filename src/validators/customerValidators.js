
import {body, param} from 'express-validator';

export const idParam = [param('id')
    .isInt({gt: 0}).withMessage('id must be an integer')
];

export const upsertCustomer = [
    body('name').isString().isLength({min: 1, max: 255}).withMessage('name must be a string between 1-255 characters'),
    body('email').isEmail().isString().isLength({min: 1, max: 255}).withMessage('author must be a string between 1-255 characters'),
    body('phone').isMobilePhone().withMessage('Must be a valid phone number'),
    body('address').isString().isLength({min: 1, max: 255}).withMessage('address must be a string between 1-255 characters'),
]