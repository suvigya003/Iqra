module.exports = (sequelize, DataTypes) => {
    const StudentDetails = sequelize.define("studentDetails", {
      name: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      contactNo: {
        type: DataTypes.STRING,
      },
      emailId: {
        type: DataTypes.STRING,
      },
      oSub: {
        type: DataTypes.STRING,
      },
      batch: {
        type: DataTypes.STRING,
      },
    });
    return StudentDetails;
  };
  