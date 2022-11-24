const db = require("../../models");
const Teacher = db.teacher;
const AnswerEvaluation = db.answerEvaluation;
const Student = db.student;

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      where: {
        role: "Head",
      },
    });

    if (!teachers) {
      res.status(400).send({
        message: "Teachers not found",
      });
    } else {
      res.send({ data: teachers });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAnswerEvaluations = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    const answerEvaluations = await AnswerEvaluation.findAll({
      where: {
        teacherId: teacherId,
      },
    });

    if (!answerEvaluations) {
      res.status(400).send({
        message: "Answer Evaluations not found",
      });
    } else {
      res.send({
        data: answerEvaluations,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAssistants = async (req, res) => {
  try {
    const assistants = await Teacher.findAll({
      where: {
        role: "Assistant",
      },
    });

    if (!assistants) {
      res.status(400).send({
        message: "Assistants not found",
      });
    } else {
      res.send({ data: assistants });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
