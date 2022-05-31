const db = require("../models");
const Category = db.category;
const date = require("date-and-time");
let time = new Date();
let now = date.format(time, "YYYY-MM-DD");

exports.category_create = async (req, res) => {
    try {
        const categorydatas = await Category.findOne({ where: { name: req.body.category_name } });
        if (categorydatas)
            return res.status(400).json({ message: "this category already exist. Please recheck the input again" });
        const imgsrc = "http://127.0.0.1:3000/uploads/category_img/" + req.body.fieldname;
        const category = new Category({
            name: req.body.category_name,
            description: req.body.description,
            image: imgsrc,
            created_date: now,
        });
        await category.save();
        const category_detail = await Category.findOne({ where: { id: category.id } });
        return res.status(200).json({ message: "new category is created", data: category_detail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.category_query = async (req, res) => {
    try {
        const category_datas = await Category.findAll({ include: ["product"] });
        return res.status(200).json(category_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.category_query_by_id = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category_datas = await Category.findOne({ where: { id: categoryId } });
        if (!category_datas) return res.status(400).json({ message: "category not found" });
        return res.status(200).json(category_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
