const db = require("../models");
const Product = db.product;
const Category = db.category;
exports.initial_product = async () => {
    try {
        const productExisting = await Product.findOne();
        //if not, create it.
        if (!productExisting) {
            Product.create(
                {
                    name: 'Nike Air Max',
                    quantity: 1,
                    price: 120,
                    categoryId: 2,
                    available: true,
                    description: 'Nike, Air Max, Fashion, Shoes',                      
                    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
                    created_date: "01-01-2022",
                }
            );
            Product.create(
                {
                    name: 'iPhone 13 Mini',
                    quantity: 1,
                    price: 1360,
                    categoryId: 1,
                    available: true,
                    description: 'Apple, iPhone, 13, Mini',                                            
                    image: 'https://rewardmobile.co.uk/wp-content/uploads/2021/09/iPhone13_ProductImage_1000x1000_1.jpg',
                    created_date: "01-01-2022",
                }
            );
            Product.create(
                {
                    name: 'KOOMPI E13',
                    quantity: 1,
                    price: 270,
                    categoryId: 1,
                    available: true,
                    description: 'KOOMPI, E13, Electronics',                                            
                    image: 'https://konfulononline.com/image/cache/catalog/KOOMPI/KOOMPI%20E13/E13-RoseGold3-800px-800x800.png',
                    created_date: "01-01-2022",
                }
            );
            Product.create(
                {
                    name: 'PlayStation 5',
                    quantity: 1,
                    price: 505,
                    categoryId: 1,
                    available: true,
                    description: 'PlayStation, 5, Red Dragon',                                            
                    image: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F09%2Fsony-playstation-5-pro-release-rumors-info-000.jpg?w=960&cbr=1&q=90&fit=max',
                    created_date: "01-01-2022",
                }
            );                        
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
