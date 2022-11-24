const db = require("../../models");
const Student = db.student;

exports.updateStudent = async (req, res) => {
  try {
    const id = req.params.id;

    await Student.update({
      ...req.body,
      where: {
        id: id,
      },
    });
    res.send({ message: "Student updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
