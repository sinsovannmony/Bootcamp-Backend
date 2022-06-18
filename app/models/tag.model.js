module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("tag", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_date: {
            type: DataTypes.STRING,
        },
    });

    return Tag;
};
