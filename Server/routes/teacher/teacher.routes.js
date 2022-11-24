const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../../controllers/teacher/auth.controller");
const {
  addTeacher,
  addResult,
} = require("../../controllers/teacher/posts.controller");
const {
  getTeachers,
  getAssistants,
  getAnswerEvaluations,
} = require("../../controllers/teacher/fetches.controller");
const {
  updateTeacher, updateAnswerEvalTeacher,
} = require("../../controllers/teacher/updates.controller");
const {
  deleteTeacher,
} = require("../../controllers/teacher/discards.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/addTeacher", addTeacher);
router.post("/addResult/:studentId", addResult);
router.get("/getTeachers", getTeachers);
router.get("/getAssistants", getAssistants);
router.get("/getAnswerEvaluations/:teacherId", getAnswerEvaluations);
router.put("/updateTeacher", updateTeacher);
router.delete("/deleteTeacher", deleteTeacher);
router.put("/assignAssistant/:id", updateAnswerEvalTeacher);

module.exports = router;
