import express from 'express';
const router = express.Router();

import userRouter from './user.router.js';
import shopRouter from './shop.router.js';
import productRouter from './product.router.js';

router.use('/', userRouter);
router.use('/', shopRouter);
router.use('/', productRouter);

export default router;