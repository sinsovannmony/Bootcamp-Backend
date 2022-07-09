module.exports = (sequelize, DataTypes) => {
    const History_Product = sequelize.define("history_product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_date: {
            type: DataTypes.STRING,
        },
    });

    return History_Product;
};
