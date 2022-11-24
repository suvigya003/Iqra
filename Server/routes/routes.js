// const express = require("express");
// const router = express.Router();

// const {
//   addDailyNews,
//   addImportantEditorials,
// } = require("../../controllers/admin/posts.controller");

// router.post("/addDailyNews", addDailyNews);
// router.post("/addImportantEditorials", addImportantEditorials);

// module.exports = router;

module.exports = (app) => {
  // const assignTo = require("../controllers/admin/assignTo.controller.js");
  // const options = require("../controllers/admin/options.controller.js");
  // const previousYearPapers = require("../controllers/admin/previousYearPapers.controller.js");
  // const questions = require("../controllers/admin/questions.controller.js");
  // const statement = require("../controllers/admin/statement.controller.js");
  // const studentDetails = require("../controllers/admin/studentDetails.controller.js");
  // const tags = require("../controllers/admin/tags.controller.js");
  // const teacherDetails = require("../controllers/admin/teacherDetails.controller.js");
  const addCourse = require("../controllers/admin/addCourse.controller.js");
  const uploadContent = require("../controllers/admin/uploadContent.controller.js");
  const faq = require("../controllers/admin/faq.controller.js");
  const liveClasses = require("../controllers/admin/liveClasses.controller.js");

  const router = require("express").Router();

  // router.post("/assignTo", assignTo.create);
  // router.get("/getAllStudents", student.findAll);
  // router.get("/getStudent/:id", student.findOne);

  // router.post("/addResponse", options.create);
  // router.get("/getAllResponses", options.findAll );

  // router.post("/previousYearPapers", previousYearPapers.create);
  // router.get("/previousYearPapers", previousYearPapers.findAll);

  // router.post("/register", user.register);
  // router.post("/login", user.login);
  // router.get("/getAllUsers", user.findAll);

  // router.post("/questions", questions.create);
  // router.get("/questions", questions.findAll);
  // router.get("/getProduct/:id", product.findProductById);

  // router.post("/addBilling", payment.createOrder);

  // router.post("/addPayment", payment.createOrder);

  // router.post("/studentDetails", studentDetails.create);
  // router.get("/studentDetails", studentDetails.findAll);

  // router.post("/teacherDetails", teacherDetails.create);
  // router.get("/teacherDetails", teacherDetails.findAll);

  router.post("/addAddCourse", addCourse.create);
  router.get("/getAddCourse", addCourse.findAll);

  router.post("/addUploadContent", uploadContent.create);
  router.get("/getUploadContent", uploadContent.findAll);

  router.post("/addFaq", faq.create);
  router.get("/getFaq", faq.findAll);

  router.post("/addLiveClasses", liveClasses.create);
  router.get("/getLiveClasses", liveClasses.findAll);

  // router.post("/addOrder", order.create);
  // router.get("/getAllOrders", order.findAll);
  // router.get("/getOrderByUser/:id", order.findByUser);

  app.use("/api/ias", router);
};
