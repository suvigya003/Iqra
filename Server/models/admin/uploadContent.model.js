module.exports = (sequelize, DataTypes) => {
    const UploadContent = sequelize.define("uploadContent", {
      subject: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      link: {
        type: DataTypes.STRING,
      },
      // subjectName: {
      //   type: DataTypes.JSON,
      // },
    });
    return UploadContent;
  };
  