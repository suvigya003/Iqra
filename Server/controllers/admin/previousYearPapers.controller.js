const db = require('../models/admin');
const PreviousYearPapers = db.previousYearPapers;

exports.create = async (req, res) => {
    console.log(req.body);
    PreviousYearPapers.create(req.body).then(data => {
        res.send(
            {
                message: "Paper added successfully",
            }
        );
    }).catch(err => {
        res.send(err);
        console.log(err);
    });
}