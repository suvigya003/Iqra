module.exports = (sequelize, DataTypes) => {
    const Faq = sequelize.define("faq", {
      question: {
        type: DataTypes.STRING,
      },
      answer: {
        type: DataTypes.STRING,
      },
    });
    return Faq;
  };
  