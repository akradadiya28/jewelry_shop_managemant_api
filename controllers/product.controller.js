import Product from "../models/product.model.js";

const calculatePrice = (carat, pricePerCarat, margin) => {
    const caratPrice = carat * pricePerCarat;
    const price = caratPrice;
    const marginAmount = (price * margin) / 100;
    const finalAmount = price + marginAmount;
    return { price, marginAmount, finalAmount };
};

export const createProduct = async (req, res) => {
    try {
        const { name, type, carat, clarity, color, cut, rtsValue, brownInc, lab, available, pricePerCarat, margin, shopId } = req.body;

        const { price, marginAmount, finalAmount } = calculatePrice(carat, pricePerCarat, margin);

        const product = await Product.create({ name, type, carat, clarity, color, cut, rtsValue, brownInc, lab, available, pricePerCarat, margin, marginAmount, finalAmount, shopId });
        console.log("createProduct", product);

        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.log("create-product-error", error);
        return res.status(500).json({ message: "Error creating product", error });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        console.log("getProducts", products);

        if (products.length === 0) {
            return res.status(404).json({ message: 'Products not found' });
        }

        return res.status(200).json({ message: 'Products found', products });
    } catch (error) {
        console.log("getProducts-error", error);
        return res.status(500).json({ message: 'Error getting products', error });
    }
}; 