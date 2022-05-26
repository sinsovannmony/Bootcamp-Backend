module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date_of_birth: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_date: {
            type: DataTypes.STRING,
        },
    });

    return User;
};
