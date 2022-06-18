const db = require("../models");
const Product = db.product;
const date = require("date-and-time");
let time = new Date();
let now = date.format(time, "DD-MM-YYYY");

exports.product_create = async (req, res) => {
    try {
        const productdatas = await Product.findOne({ where: { name: req.body.product_name } });
        if (productdatas) return res.status(400).json({ message: "product already exist" });
        // const imgRead = req.files["product_img"].data.toString("base64");
        console.log(imgRead);
        const product = new Product({
            name: req.body.product_name,
            quantity: req.body.quantity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            available: true,
            description: req.body.description,
<<<<<<< HEAD
            image: "img_url",
=======
            image: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
>>>>>>> 6cf12dfdb2223b548a75e7c484e5f1e42be6f0b8
            created_date: now,
        });
        await product.save();
        const product_detail = await Product.findOne({ where: { id: product.id } });
        return res.status(200).json({ message: "product create successfully", data: product_detail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.product_query = async (req, res) => {
    try {
        const product_datas = await Product.findAll({ include: ["tag"] });
        return res.status(200).json(product_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.product_query_by_id = async (req, res) => {
    try {
        const { productId } = req.params;
        const product_datas = await Product.findOne({ where: { id: productId }, include: ["tag"] });
        if (!product_datas) return res.status(400).json({ message: "product not found" });
        return res.status(200).json(product_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.edit_product = async (req, res) => {
    try {
        const { productId } = req.params;
        const product_datas = await Product.findOne({ where: { id: productId } });
        if (!product_datas) return res.status(400).json({ message: "product not found" });
        await Product.update(
            {
                name: req.body.product_name,
                quantity: req.body.quantity,
                price: req.body.price,
                categoryId: req.body.categoryId,
                available: req.body.available,
                description: req.body.description,
                image: "image_url",
                created_date: now,
            },
            { where: { id: product_datas.id } }
        );
        const product_detail = await Product.findOne({ where: { id: product_datas.id } });
        return res.status(200).json({ message: "product have been edited", data: product_detail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.delete_product = async (req, res) => {
    const { productId } = req.params;
    try {
        const product_datas = await Product.findOne({ where: { id: productId } });
        if (!product_datas) return res.status(400).json({ message: "product not found" });
        await Product.destroy({ where: { id: productId } });
        return res.status(200).json({ message: "delete product successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
