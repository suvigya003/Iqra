const db = require('../models');
const StudentDetails = db.studentDetails;

exports.create = async (req, res) => {
    console.log(req.body);
    StudentDetails.create(req.body).then(data => {
        res.send(
            {
                message: "Student details added successfully",
            }
        );
    }).catch(err => {
        res.send(err);
        console.log(err);
    });
}

exports.findAll = async (req, res) => {
    studentDetails.findAll().then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.send(err);
        console.log(err);
    }
    );
}