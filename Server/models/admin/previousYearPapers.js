module.exports = (sequelize, DataTypes) => {
    const PreviousYearPapers = sequelize.define("previousYearPapers", {
      year: {
        type: DataTypes.STRING,
      },
    });
    return PreviousYearPapers;
  };
  