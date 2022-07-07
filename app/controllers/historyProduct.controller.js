const db = require("../models");
const History_Product = db.history_product;
const User = db.user;
const date = require("date-and-time");
let time = new Date();
let now = date.format(time, "DD-MM-YYYY");

exports.product_history_create = async (req, res) => {
    try {
        const { id } = req.userData;
        const user = await User.findOne({ where: { id: id } });
        if (!user) return res.status(400).json({ message: "user not found" });
        const history_product = new History_Product({
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
        await history_product.save();
        const product_history_detail = await History_Product.findOne({ where: { id: history_product.id } });
        return res.status(200).json({ message: "history product create successfully", data: product_history_detail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.product_history_query = async (req, res) => {
    try {
        const history_product_datas = await History_Product.findAll();
        return res.status(200).json(history_product_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.product_history_query_base_on_user = async (req, res) => {
    try {
        const { id } = req.userData;
        const user = await User.findOne({ where: { id: id } });
        if (!user) return res.status(400).json({ message: "user not found" });
        const productHistory_datas = await History_Product.findAll({ where: { userId: id } });
        if (!productHistory_datas) return res.status(400).json({ message: "product history not found" });
        return res.status(200).json(productHistory_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.delete_product_history = async (req, res) => {
    const { producthistoryId } = req.params;
    try {
        const product_history_datas = await History_Product.findOne({ where: { id: producthistoryId } });
        if (!product_history_datas) return res.status(400).json({ message: "product history not found" });
        await History_Product.destroy({ where: { id: producthistoryId } });
        return res.status(200).json({ message: "delete history product successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
