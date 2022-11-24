const express = require("express");
const router = express.Router();


const {
  register,
  login,
} = require("../../controllers/student/auth.controller");
const {
  addStudent,
  addAnswerEvaluation,
} = require("../../controllers/student/posts.controller");
const {
  getStudents,
  getStudent,
  getResults,
} = require("../../controllers/student/fetches.controller");
const {
  updateStudent,
} = require("../../controllers/student/updates.controller");
const {
  deleteStudent,
} = require("../../controllers/student/discards.controller");


router.post("/register", register);
router.post("/login", login);
router.post("/addStudent", addStudent);
router.post("/addAnswerEvaluation/:teacherId", addAnswerEvaluation);
router.get("/getStudents", getStudents);
router.get("/getStudent/:id", getStudent);
router.get("/getResults/:studentId", getResults);
router.put("/updateStudent", updateStudent);
router.delete("/deleteStudent", deleteStudent);

module.exports = router;
