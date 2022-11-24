const dbConfig = require("../configs/db.config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Admin
db.dailyNews = require("./admin/dailyNews.model")(sequelize, DataTypes);
db.importantEditorials = require("./admin/importantEditorials.model")(
  sequelize,
  DataTypes
);
db.moreLinks = require("./admin/moreLinks.model")(sequelize, DataTypes);
db.teacher = require("./admin/teacher.model")(sequelize, DataTypes);
db.student = require("./admin/student.model")(sequelize, DataTypes);
db.answerEvaluation = require("./admin/answerEvaluation.model")(
  sequelize,
  DataTypes
);
db.result = require("./admin/result.model")(sequelize, DataTypes);

db.addCourse = require('./admin/addCourse.model')(sequelize, Sequelize);
db.uploadContent = require('./admin/uploadContent.model')(sequelize, Sequelize);
db.faq = require('./admin/faq.model')(sequelize, Sequelize);
db.liveClasses = require('./admin/liveClasses.model')(sequelize, Sequelize);

// db.teacher.hasMany(db.student);
// db.student.belongsTo(db.teacher);

module.exports = db;
