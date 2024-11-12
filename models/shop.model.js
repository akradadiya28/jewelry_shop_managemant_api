import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true,
        trim: true,
    },
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    shopDescription: {
        type: String,
        required: true,
        trim: true,
    },
    contactNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    productsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        // required: true
    }],
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
}, { timestamps: true, versionKey: false });

const Shop = mongoose.model('Shop', shopSchema);

export default Shop;
