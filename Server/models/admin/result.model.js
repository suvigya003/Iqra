module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define("result", {
    resultFile: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
    studentId: {
      type: DataTypes.STRING,
    },
    answerFile: {
      type: DataTypes.STRING,
    },
  });
  return Result;
};
