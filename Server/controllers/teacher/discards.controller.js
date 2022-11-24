const db = require("../../models");
const Teacher = db.teacher;

exports.deleteTeacher = async (req, res) => {
  try {
    const id = req.params.id;

    await Teacher.delete({
      where: {
        id: id,
      },
    });
    res.send({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
