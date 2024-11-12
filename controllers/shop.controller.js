import Shop from '../models/shop.model.js';

export const createShop = async (req, res) => {
    try {
        const { shopName, shopDescription, contactNumber, email, productsId, street, city, state, zip, country } = req.body;
        const shop = await Shop.create({ shopName, shopDescription, contactNumber, email, productsId, street, city, state, zip, country });
        console.log("createShop", shop);

        return res.status(201).json({ message: 'Shop created successfully', shop });
    } catch (error) {
        console.log("createShop-error", error);
        return res.status(500).json({ message: 'Error creating shop', error });
    }
}

export const getShop = async (req, res) => {
    try {
        const shop = await Shop.find()
        console.log("getShop", shop);

        if (shop.length === 0) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        return res.status(200).json({ message: 'Shop found', shop });
    } catch (error) {
        console.log("getShop-error", error);
        return res.status(500).json({ message: 'Error getting shop', error });
    }
}