const cloudinary = require("../../configs/cloudinary.config");
const formidable = require("formidable");
const db = require("../../models");
const Teacher = db.teacher;
const Result = db.result;

exports.addTeacher = async (req, res) => {
  try {
    await Teacher.create({
      ...req.body,
    });
    res.send({ message: "Teacher added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.addResult = async (req, res) => {
  try {
    console.log("hey");
    const studentId = req.params.studentId;

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
      if (err) {
        res.status(400).send({
          error: "Error adding result file",
        });
      }
      if (!(Object.keys(file).length > 0)) {
        res.status(400).send({
          message: "Please provide a file",
        });
      }

      const { comment, answerFile, studentId } = fields;

      cloudinary.uploader.upload(file.resultFile.filepath, (err, result) => {
        Result.create({
          resultFile: result.secure_url,
          studentId: studentId,
          comment: comment,
          answerFile: answerFile,
        })
          .then((data) => {
            res.status(200).send({
              message: "Result added sucessfully",
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
