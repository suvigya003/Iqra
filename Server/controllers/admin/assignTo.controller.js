const db = require('../models/admin');
const AssignTo = db.assignTo;

exports.create = async (req, res) => {
    console.log(req.body);
    AssignTo.create(req.body).then(data => {
        res.send(
            {
                message: "Assigned successfully",
            }
        );
    }).catch(err => {
        res.send(err);
        console.log(err);
    });
}