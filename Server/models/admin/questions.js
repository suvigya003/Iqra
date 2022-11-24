module.exports = (sequelize, DataTypes) => {
    const Questions = sequelize.define("questions", {
      quesType: {
        type: DataTypes.STRING,
      },
      questionMain: {
        type: DataTypes.STRING,
      },
      questionSecondary: {
        type: DataTypes.STRING,
      },
    });
    return Questions;
  };
  