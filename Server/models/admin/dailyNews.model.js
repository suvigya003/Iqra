module.exports = (sequelize, DataTypes) => {
  const DailyNews = sequelize.define("dailyNews", {
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
    image: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.STRING,
    },
  });
  return DailyNews;
};
