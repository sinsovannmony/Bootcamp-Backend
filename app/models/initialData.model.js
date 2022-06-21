const db = require("../models");
const Product = db.product;
const Category = db.category;
const Tag = db.tag;
exports.initial_product = async () => {
    try {
        const productExisting = await Product.findOne();
        //if not, create it.
        if (!productExisting) {
            Product.create({
                name: "Nike Air Max",
                quantity: 1,
                price: 120,
                categoryId: 2,
                available: true,
                description:
                    "Nike Air is our iconic innovation that uses pressurized air in a durable, flexible membrane to provide lightweight cushioning. The air compresses on impact and then immediately returns to its original shape and volume, ready for the next impact.",
                image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png",
                created_date: "01-01-2022",
            });
            Product.create({
                name: "iPhone 13 Mini",
                quantity: 1,
                price: 1360,
                categoryId: 1,
                available: true,
                description:
                    "Apple's iPhone 13 features a ceramic shield front, Super Retina XDR display with True Tone and an A15 Bionic chip. The first design change users will notice is the smaller notch. After years of using the same-sized notch to house the Face ID components, Apple has finally reduced its size by 20%.",
                image: "https://rewardmobile.co.uk/wp-content/uploads/2021/09/iPhone13_ProductImage_1000x1000_1.jpg",
                created_date: "01-01-2022",
            });
            Product.create({
                name: "KOOMPI E13",
                quantity: 1,
                price: 270,
                categoryId: 1,
                available: true,
                description:
                    "KOOMPI is different. By default, it comes with a Linux based Operating System of its own, known as KOOMPI OS. The software is free to use and free to change. No force software update on users. Users can update software at their own time, when desired.",
                image: "https://konfulononline.com/image/cache/catalog/KOOMPI/KOOMPI%20E13/E13-RoseGold3-800px-800x800.png",
                created_date: "01-01-2022",
            });
            Product.create({
                name: "PlayStation 5",
                quantity: 1,
                price: 505,
                categoryId: 1,
                available: true,
                description:
                    "The PlayStation 5's main hardware features include a solid-state drive customized for high-speed data streaming to enable significant improvements in storage performance, an AMD GPU capable of 4K resolution display at up to 120 frames per second, hardware-accelerated ray tracing for realistic lighting and reflections",
                image: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F09%2Fsony-playstation-5-pro-release-rumors-info-000.jpg?w=960&cbr=1&q=90&fit=max",
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
