import express from 'express';
const productRouter = express.Router();
import { createProduct, getProducts } from '../controllers/product.controller.js';
import verifyUser from '../config/auth.js';
import { validateProduct } from '../middleware/validation.js';

productRouter.post('/create-product', verifyUser, validateProduct, createProduct);
productRouter.get('/get-products', verifyUser, getProducts);

export default productRouter;