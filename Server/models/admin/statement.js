module.exports = (sequelize, DataTypes) => {
    const Statement = sequelize.define("statement", {
      statement: {
        type: DataTypes.STRING,
      },
    });
    return Statement;
  };
  