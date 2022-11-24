const db = require("../../models");
const cloudinary = require("../../configs/cloudinary.config");
const formidable = require("formidable");
const Student = db.student;
const AnswerEvaluation = db.answerEvaluation;

exports.addStudent = async (req, res) => {
  try {
    await Student.create({
      ...req.body,
    });
    res.send({ message: "Student added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.addAnswerEvaluation = async (req, res) => {
  try {
    console.log("checking on server");

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
      if (err) {
        res.status(400).send({
          error: "Error adding answer file",
        });
      }
      if (!(Object.keys(file).length > 0)) {
        res.status(400).send({
          message: "Please provide a file",
        });
      }

      const { teacherId, studentId, studentName } = fields;

      cloudinary.uploader.upload(file.answerFile.filepath, (err, result) => {
        AnswerEvaluation.create({
          answerFile: result.secure_url,
          teacherId: teacherId,
          studentId: studentId,
          studentName: studentName,
        })
          .then((data) => {
            res.status(200).send({
              message: "Answer key added sucessfully",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Database error",
            });
          });
      });
    });
  } catch (err) {
    res.status(500).send({
      error: "Internal server error",
    });
  }
};
