module.exports = (sequelize, DataTypes) => {
    const AssignTo = sequelize.define("assignTo", {
      teacher: {
        type: DataTypes.STRING,
      },
    });
    return AssignTo;
  };
  