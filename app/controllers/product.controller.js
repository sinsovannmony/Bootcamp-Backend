const db = require("../models");
const Product = db.product;
const User = db.user;
const date = require("date-and-time");
let time = new Date();
let now = date.format(time, "DD-MM-YYYY");

exports.product_create = async (req, res) => {
    try {
        const { id } = req.userData;
        const user = await User.findOne({ where: { id: id } });
        if (!user) return res.status(400).json({ message: "user not found" });
        const product = new Product({
            name: req.body.product_name,
            quantity: req.body.quantity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            available: true,
            description: req.body.description,
            image: "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
            created_date: now,
            userId: id,
        });
        await product.save();
        const product_detail = await Product.findOne({
            where: { id: product.id },
        });
        return res.status(200).json({
            message: "product create successfully",
            data: product_detail,
        });
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
        const product_datas = await Product.findOne({
            where: { id: productId },
            include: ["tag"],
        });
        if (!product_datas) return res.status(400).json({ message: "product not found" });
        return res.status(200).json(product_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.product_query_base_on_user = async (req, res) => {
    try {
        const { id } = req.userData;
        const user = await User.findOne({ where: { id: id } });
        if (!user) return res.status(400).json({ message: "user not found" });
        const product_datas = await Product.findAll({ where: { userId: id }, include: ["tag"] });
        if (!product_datas) return res.status(400).json({ message: "product not found" });
        return res.status(200).json(product_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.edit_product = async (req, res) => {
    try {
        const { productId } = req.params;
        const product_datas = await Product.findOne({
            where: { id: productId },
        });
        if (!product_datas) return res.status(400).json({ message: "product not found" });
        await Product.update(
            {
                name: req.body.product_name,
                quantity: req.body.quantity,
                price: req.body.price,
                categoryId: req.body.categoryId,
                available: req.body.available,
                description: req.body.description,
                image: req.body.image,
                created_date: now,
            },
            { where: { id: product_datas.id } }
        );
        const product_detail = await Product.findOne({
            where: { id: product_datas.id },
        });
        return res.status(200).json({
            message: "product have been edited",
            data: product_detail,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.delete_product = async (req, res) => {
    const { productId } = req.params;
    try {
        const product_datas = await Product.findOne({
            where: { id: productId },
        });
        if (!product_datas) return res.status(400).json({ message: "product not found" });
        await Product.destroy({ where: { id: productId } });
        return res.status(200).json({ message: "delete product successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
