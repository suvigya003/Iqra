module.exports = (sequelize, DataTypes) => {
  const MoreLinks = sequelize.define("moreLinks", {
    date: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.STRING,
    },
  });
  return MoreLinks;
};
