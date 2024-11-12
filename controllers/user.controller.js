import User from '../models/user.model.js';
import Shop from '../models/shop.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fs from 'fs';
import crypto from 'crypto';

export const registerUser = async (req, res) => {
    try {
        const { firstName, shopId, lastName, email, password, phone, role, street, city, state, zip, country } = req.body;

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+com$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email must end with .com' });
        }

        const phoneRegex = /^\+91[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: 'Phone number must start with +91 and the first digit must be between 6 to 9' })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, shopId, lastName, email, password: hashedPassword, phone, role, street, city, state, zip, country, profileImage: req?.file?.path });
        console.log("registerUser", user);

        const shop = await Shop.findByIdAndUpdate(shopId, { $addToSet: { userId: user._id } }, { new: true });
        // console.log("shop", shop);

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.log("registor-error", error);
        return res.status(500).json({ message: 'Error creating user', error });

    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const tokenId = crypto.randomBytes(16).toString('hex');
        user.tokenId = tokenId;
        await user.save();

        const token = jwt.sign({ userId: user._id, tokenId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("token", token);

        return res.status(200).json({ message: 'Login successful', token: token });
    } catch (error) {
        console.log("login-error", error);
        return res.status(500).json({ message: 'Error logging in', error });
    }
};

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('shopId');
        console.log("getUser", user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User found', user });
    } catch (error) {
        console.log("getUser-error", error);
        return res.status(500).json({ message: 'Error getting user', error });
    }
}

export const editUser = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, street, city, state, zip, country } = req.body;
        const user = await User.findByIdAndUpdate({ _id: req.userId });
        console.log("update-user", user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const oldImg = user.profileImage;

        if (oldImg && fs.existsSync(path.join(process.cwd(), oldImg))) {
            fs.unlinkSync(path.join(process.cwd(), oldImg));
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        user.street = street;
        user.city = city;
        user.state = state;
        user.zip = zip;
        user.country = country;
        user.profileImage = req.file.path;

        await user.save();
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.log("edit-user-error", error);
        return res.status(400).json({ message: 'Error edit user', error })
    }
}

export const getShopUser = async (req, res) => {
    try {
        const shopUser = await User.find({ shopId: req.body.shopId })
        console.log("getShopUser", shopUser);

        if (shopUser.length === 0) {
            return res.status(404).json({ message: 'Shop User not found' });
        }
        return res.status(200).json({ message: 'Shop User found', shopUser });
    } catch (error) {
        console.log("get-shop-user-error", error);
        return res.status(400).json({ message: 'Error get shop user' })
    }
}
export const logOutUser = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user.tokenId = null;
        await req.user.save();
        return res.status(200).json('Logged out successfully');
    } catch (error) {
        console.log("log-out-error", error);
        return res.status(500).json({ message: 'Error logging out', error });
    }
};