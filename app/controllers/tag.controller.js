const db = require("../models");
const Tag = db.tag;
const date = require("date-and-time");
let time = new Date();
let now = date.format(time, "DD-MM-YYYY");

exports.tag_add = async (req, res) => {
    try {
        const tagdatas = await Tag.findOne({ where: { productId: req.body.productId, name: req.body.tag_name } });
        if (tagdatas) return res.status(400).json({ message: "this tag already in this product" });
        const tag = new Tag({
            name: req.body.tag_name,
            productId: req.body.productId,
            created_date: now,
        });
        await tag.save();
        const tag_detail = await Tag.findOne({ where: { id: tag.id } });
        return res.status(200).json({ message: "new tag is created", data: tag_detail });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.tag_query = async (req, res) => {
    try {
        const tag_datas = await Tag.findAll();
        return res.status(200).json(tag_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.tag_query_by_productId = async (req, res) => {
    try {
        const { productId } = req.params;
        const tag_datas = await Tag.findAll({ where: { productId: productId } });
        if (!tag_datas) return res.status(400).json({ message: "productId not found" });
        return res.status(200).json(tag_datas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
