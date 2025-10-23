
import {body, param} from 'express-validator';

export const idParam = [param('id')
    .isInt({gt: 0}).withMessage('id must be an integer')
];

export const upsertOrder = [
    body('customer_id').isInt({gt: 0}).withMessage('customer id must be a positive integer.'),
    body('book_id').isInt({gt: 0}).withMessage('book id must be a positive integer.'),
    body('quantity').isInt().withMessage('quantity id must be a positive integer.'),
    body('total_price').isFloat().withMessage('price must be a decimal number'),
]