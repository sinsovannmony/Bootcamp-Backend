module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('company', {
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bankType: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    return User;
  };
  