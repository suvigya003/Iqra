module.exports = (sequelize, DataTypes) => {
    const Options = sequelize.define("options", {
      
      option: {
        type: DataTypes.STRING,
      },
    });
    return Options;
  };
  