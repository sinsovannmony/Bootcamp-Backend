const db = require("../models");
const Product = db.product;
const date = require("date-and-time");
let time = new Date();
let now = date.format(time, "YYYY-MM-DD");

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
        const product_datas = await Product.findAll();
        return res.status(200).json(product_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.product_query_by_id = async (req, res) => {
    try {
        const { productId } = req.params;
        const product_datas = await Product.findOne({ where: { id: productId } });
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
        const product = new Product({
            name: req.body.product_name,
            quantity: req.body.quantity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            available: req.body.available,
            description: req.body.description,
            image: "image_url",
            created_date: now,
        });
        await product.save();
        const product_detail = await Product.findOne({ where: { id: product.id } });
        return res.status(200).json({ message: "product have been edited", data: product_detail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
