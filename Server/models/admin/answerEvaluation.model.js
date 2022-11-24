module.exports = (sequelize, DataTypes) => {
  const AnswerEvaluation = sequelize.define("answerEvaluation", {
    answerFile: {
      type: DataTypes.STRING,
    },
    teacherId: {
      type: DataTypes.STRING,
    },
    studentId: {
      type: DataTypes.STRING,
    },
    studentName: {
      type: DataTypes.STRING,
    },
  });
  return AnswerEvaluation;
};
