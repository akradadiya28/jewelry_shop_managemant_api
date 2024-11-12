import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String,
        enum: ['Solitaire', 'Engagement', 'Wedding', 'Anniversary', 'Casual', 'Other']
    },
    carat: {
        type: Number
    },
    clarity: {
        type: String,
        enum: ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2']
    },
    color: {
        type: String,
        enum: ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
    },
    cut: {
        type: String,
        enum: ['Round', 'Princess', 'Emerald', 'Asscher', 'Marquise', 'Oval', 'Radiant', 'Pear', 'Heart']
    },
    rtsValue: {
        type: Number
    },
    brownInc: {
        type: Boolean
    },
    lab: {
        type: String,
        enum: ['GIA', 'IGI', 'AGS', 'HRD', 'Other']
    },
    available: {
        type: Boolean
    },
    pricePerCarat: {
        type: Number
    },
    margin: {
        type: Number
    },
    marginAmount: {
        type: Number
    },
    finalAmount: {
        type: Number
    }
}, { timestamps: true, versionKey: false });

const Product = mongoose.model("Product", productSchema);

export default Product;