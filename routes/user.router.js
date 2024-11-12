import express from 'express';
const userRouter = express.Router();
import { registerUser, loginUser, getUserDetails, editUser, getShopUser, logOutUser } from '../controllers/user.controller.js';
import verifyUser from '../config/auth.js';
import upload from '../middleware/multer.js';

userRouter.post('/register', upload.single('profileImage'), registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-user', verifyUser, getUserDetails);
userRouter.put('/edit-user', verifyUser, upload.single('profileImage'), editUser);
userRouter.post('/get-shop-user', getShopUser);
userRouter.post('/logout', verifyUser, logOutUser);

export default userRouter;