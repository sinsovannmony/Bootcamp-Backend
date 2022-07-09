const db = require("../models");
const Cart = db.cart;
const User = db.user;
const date = require("date-and-time");
let time = new Date();
let now = date.format(time, "DD-MM-YYYY");

exports.cart_create = async (req, res) => {
    try {
        const { id } = req.userData;
        const user = await User.findOne({ where: { id: id } });
        if (!user) return res.status(400).json({ message: "user not found" });
        const cartdatas = await Cart.findOne({
            where: { name: req.body.cart_name, userId: id },
        });
        if (cartdatas)
            return res.status(400).json({ message: "cart already exist" });
        const cart = new Cart({
            name: req.body.cart_name,
            quantity: req.body.quantity,
            price: req.body.price,
            categoryId: req.body.categoryId,
            available: true,
            description: req.body.description,
            image: req.body.product_img,
            created_date: now,
            userId: id,
        });
        await cart.save();
        const cart_detail = await Cart.findOne({ where: { id: cart.id } });
        return res
            .status(200)
            .json({ message: "cart create successfully", data: cart_detail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.cart_query = async (req, res) => {
    try {
        const cart_datas = await Cart.findAll();
        return res.status(200).json(cart_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.cart_query_by_id = async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart_datas = await Cart.findOne({ where: { id: cartId } });
        if (!cart_datas)
            return res.status(400).json({ message: "cart not found" });
        return res.status(200).json(cart_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.cart_query_base_on_user = async (req, res) => {
    try {
        const { id } = req.userData;
        const user = await User.findOne({ where: { id: id } });
        if (!user) return res.status(400).json({ message: "user not found" });
        const cart_datas = await Cart.findAll({ where: { userId: id } });
        if (!cart_datas)
            return res.status(400).json({ message: "cart not found" });
        return res.status(200).json(cart_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.edit_cart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart_datas = await Cart.findOne({ where: { id: cartId } });
        if (!cart_datas)
            return res.status(400).json({ message: "cart not found" });
        await Cart.update(
            {
                name: req.body.cart_name,
                quantity: req.body.quantity,
                price: req.body.price,
                categoryId: req.body.categoryId,
                available: req.body.available,
                description: req.body.description,
                image: "image_url",
                created_date: now,
            },
            { where: { id: cart_datas.id } }
        );
        const cart_detail = await Cart.findOne({
            where: { id: cart_datas.id },
        });
        return res
            .status(200)
            .json({ message: "cart have been edited", data: cart_detail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.delete_cart = async (req, res) => {
    const { cartId } = req.params;
    try {
        const cart_datas = await Cart.findOne({ where: { id: cartId } });
        if (!cart_datas)
            return res.status(400).json({ message: "cart not found" });
        await Cart.destroy({ where: { id: cartId } });
        return res.status(200).json({ message: "delete cart successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
