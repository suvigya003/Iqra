const db = require('../models/admin');
const TeacherDetails = db.teacherDetails;

exports.create = async (req, res) => {
    console.log(req.body);
    TeacherDetails.create(req.body).then(data => {
        res.send(
            {
                message: "Teacher details added successfully",
            }
        );
    }).catch(err => {
        res.send(err);
        console.log(err);
    });
}

exports.findAll = async (req, res) => {
    TeacherDetails.findAll().then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.send(err);
        console.log(err);
    }
    );
}