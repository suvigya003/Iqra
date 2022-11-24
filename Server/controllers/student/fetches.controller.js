const db = require("../../models");
const Student = db.student;
const AnswerEvaluation = db.answerEvaluation;
const Result = db.result;

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();

    if (!students) {
      res.status(400).send({
        message: "Students not found",
      });
    } else {
      res.send({ data: students });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAnswerEvaluations = async (req, res) => {
  try {
    const files = await AnswerEvaluation.findAll();

    if (!files) {
      res.status(400).send({
        message: "Files not found",
      });
    } else {
      res.send({ data: files });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await Student.findOne({
      where: {
        id: id,
      },
    });

    if (!student) {
      res.status(400).send({
        message: "Student not found",
      });
    } else {
      res.send({ val: student });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getResults = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    console.log("hey");

    const results = await Result.findAll({
      where: {
        studentId: studentId,
      },
    });

    if (!results) {
      res.status(400).send({
        message: "Results not found",
      });
    } else {
      res.send({ data: results });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
