module.exports = (sequelize, DataTypes) => {
    const TeacherDetails = sequelize.define("teacherDetails", {
      name: {
        type: DataTypes.STRING,
      },
      subject: {
        type: DataTypes.STRING,
      },
      emailId: {
        type: DataTypes.STRING,
      },
      contactNo: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      loginId: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    });
    return TeacherDetails;
  };
  