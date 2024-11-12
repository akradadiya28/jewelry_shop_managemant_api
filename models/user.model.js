import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    },
    profileImage: {
        type: String
    },
    tokenId: {
        type: String,
        default: null
    }
}, { timestamps: true, versionKey: false });

const User = mongoose.model('User', userSchema);

export default User;