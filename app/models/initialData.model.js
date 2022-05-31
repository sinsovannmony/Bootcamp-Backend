const db = require("../models");
const Product = db.product;
const Category = db.category;
exports.initial_product = async () => {
    try {
        const productExisting = await Product.findOne();
        //if not, create it.
        if (!productExisting) {
            Product.create({
                name: "iphone",
                quantity: 1,
                price: 1200,
                categoryId: 1,
                available: true,
                description: "apple product that call iphone",
                image: "image_url",
                created_date: "01-01-2022",
            });
            Product.create({
                name: "samsung",
                quantity: 1,
                price: 900,
                categoryId: 1,
                available: true,
                description: "android product that call samsung",
                image: "image_url",
                created_date: "01-01-2022",
            });
            Product.create({
                name: "Huawei",
                quantity: 1,
                price: 1200,
                categoryId: 1,
                available: true,
                description: "android product that call huawei",
                image: "image_url",
                created_date: "01-01-2022",
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

exports.initial_category = async () => {
    try {
        const categoryExisting = await Category.findOne();
        //if not, create it.
        if (!categoryExisting) {
            Category.create({
                name: "phone",
                description: "all item in this category is phone",
                created_date: "01-01-2022",
            });
            Category.create({
                name: "laptop",
                description: "all item in this category is laptop",
                created_date: "01-01-2022",
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};
