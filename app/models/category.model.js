module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_date: {
        type: DataTypes.STRING,
      },
    });
  
    return Category;
  };
  
  