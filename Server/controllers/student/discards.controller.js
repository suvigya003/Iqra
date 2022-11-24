const db = require("../../models");
const Student = db.student;

exports.deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    await Student.delete({
      where: {
        id: id,
      },
    });
    res.send({ message: "Student deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
