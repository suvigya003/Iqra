module.exports = (sequelize, DataTypes) => {
    const AddCourse = sequelize.define("addCourse", {
      courseName: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      courseDuration: {
        type: DataTypes.STRING,
      },
      heading: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      lessons: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
      },
      subjectName: {
        type: DataTypes.JSON,
      },
      level: {
        type: DataTypes.STRING,
      },
      medium: {
        type: DataTypes.STRING,
      },
    });
    return AddCourse;
  };
  