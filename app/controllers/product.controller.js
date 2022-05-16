const db = require("../models");
const Product = db.product;

exports.product_create = async (req, res) => {
    try {
        const productdatas = await Product.findOne({ where: { name: req.body.product_name } });
        if (productdatas) return res.status(400).json({ message: "product already exist" });
        const product = new Product({
            name: req.body.product_name,
            quantity: req.body.quantity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            available: true,
            description: req.body.description,
            image: "image_url",
            created_date: "xx-xx-xxxx",
        });
        await product.save();
        const product_detail = await Product.findOne({ where: { id: product.id } });
        return res.status(200).json({ message: "product create successfully", data: product_detail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
