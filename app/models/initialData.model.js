const db = require("../models");
const Product = db.product;
const Category = db.category;
const Tag = db.tag;
exports.initial_product = async () => {
    try {
        // const productExisting = await Product.findOne();
        //if not, create it.
        if (!productExisting) {
            Product.create({
                name: "Nike Air Max",
                quantity: 1,
                price: 120,
                categoryId: 2,
                available: true,
                description: "Nike, Air Max, Fashion, Shoes",
                image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png",
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
                name: "Electronics",
                description: "Electronics Devices",
                image: "https://img.icons8.com/stickers/100/undefined/multiple-devices.png",
                created_date: "01-01-2022",
            });
            Category.create({
                name: "Footwear",
                description: "All shoe",
                image: "https://img.icons8.com/stickers/100/000000/pair-of-sneakers.png",
                created_date: "01-01-2022",
            });
            Category.create({
                name: "Beauty",
                description: "beauty products",
                image: "https://img.icons8.com/stickers/100/000000/lip-gloss.png",
                created_date: "01-01-2022",
            });
            Category.create({
                name: "Apparel",
                description: "suit and formal clothes",
                image: "https://img.icons8.com/stickers/100/000000/formal-outfit.png",
                created_date: "01-01-2022",
            });
            Category.create({
                name: "Tableware",
                description: "table kits",
                image: "https://img.icons8.com/stickers/100/000000/tableware.png",
                created_date: "01-01-2022",
            });
            Category.create({
                name: "Tools",
                description: "capenter tools",
                image: "https://img.icons8.com/stickers/100/000000/full-tool-storage-box-.png",
                created_date: "01-01-2022",
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};

exports.initial_tag = async () => {
    try {
        const tagExisting = await Tag.findOne();
        //if not, create it.
        if (!tagExisting) {
            Tag.create({
                name: "yeezy",
                created_date: "01-01-2022",
                productId: 1,
            });
            Tag.create({
                name: "slide",
                created_date: "01-01-2022",
                productId: 1,
            });
            Tag.create({
                name: "offwhite",
                created_date: "01-01-2022",
                productId: 2,
            });
            Tag.create({
                name: "shoe",
                created_date: "01-01-2022",
                productId: 3,
            });
            Tag.create({
                name: "adidas",
                created_date: "01-01-2022",
                productId: 3,
            });
            Tag.create({
                name: "sneaker",
                created_date: "01-01-2022",
                productId: 1,
            });
            Tag.create({
                name: "sport",
                created_date: "01-01-2022",
                productId: 1,
            });
            Tag.create({
                name: "fashion",
                created_date: "01-01-2022",
                productId: 2,
            });
        }
    } catch (error) {
        console.log(error.message);
    }
};
