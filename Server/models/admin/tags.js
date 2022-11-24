module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("tags", {
      tagValues: {
        type: DataTypes.STRING,
      },
    });
    return Tags;
  };
  