import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {bookRoutes} from './routes/bookRoutes.js';
import { healthCheck } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { customerRoutes } from './routes/customerRoutes.js';
import { orderRoutes } from './routes/orderRoutes.js';

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());

app.get('/health', async(req, res)=>{
    try{
        res.json({ok: await healthCheck()})
    }catch(e){
        res.status(500).json({ok: false})
    }
});

app.use('/api/books', bookRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use(errorHandler);