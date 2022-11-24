module.exports = (sequelize, DataTypes) => {
    const LiveClasses = sequelize.define("liveClasses", {
      classTitle: {
        type: DataTypes.STRING,
      },
      instructorName: {
        type: DataTypes.STRING,
      },
      videoLink: {
        type: DataTypes.STRING,
      },
    });
    return LiveClasses;
  };
  