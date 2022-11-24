module.exports = (sequelize, DataTypes) => {
  const ImportantEditorials = sequelize.define("importantEditorials", {
    date: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    readingTime: {
      type: DataTypes.STRING,
    },
    tag: {
      type: DataTypes.STRING,
    },
    subtags: {
      type: DataTypes.STRING,
    },
    videoLink: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.STRING,
    },
  });
  return ImportantEditorials;
};
