const db = require("../../models");
const Teacher = db.teacher;
const AnswerEvaluations = db.answerEvaluation;

exports.updateTeacher = async (req, res) => {
  try {
    const id = req.params.id;

    await Teacher.update({
      ...req.body,
      where: {
        id: id,
      },
    });
    res.send({ message: "Teacher updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.updateAnswerEvalTeacher = async(req, res) => {
  try{
    // find evaluation where teacher id and id 
    console.log(Object.keys(req.body)[0]);
    var key = (Object.keys(req.body)[0]);
    console.log(req.params.id);
    const updatedAsnwerEval = await AnswerEvaluations.update(
      {
        teacherId: key,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    );
    console.log(updatedAsnwerEval);
    res.status(200).send(updatedAsnwerEval);
  }catch(error){
    console.log(error);
    res.status(500).send(error);
  }
}