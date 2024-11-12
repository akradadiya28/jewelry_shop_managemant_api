import express from 'express';
const shopRouter = express.Router();
import { createShop, getShop } from '../controllers/shop.controller.js';
import verifyUser from '../config/auth.js';

shopRouter.post('/create-shop', createShop);
shopRouter.get('/get-shop', getShop);

export default shopRouter; 