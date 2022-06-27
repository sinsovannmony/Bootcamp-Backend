const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    define: {
        timestamps: false,
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//define model

db.user = require("./user.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.cart = require("./cart.model.js")(sequelize, Sequelize);
db.tag = require("./tag.model.js")(sequelize, Sequelize);
db.history_product = require("./historyProduct.model.js")(sequelize, Sequelize);

db.category.hasMany(db.product, { as: "product" });
db.product.belongsTo(db.category, {
    foreignKey: "categoryId",
    as: "category",
});

db.product.hasMany(db.tag, { as: "tag" });
db.tag.belongsTo(db.product, {
    foreignKey: "productId",
    as: "product",
});

db.user.hasMany(db.cart, { as: "cart" });
db.cart.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user",
});

module.exports = db;
