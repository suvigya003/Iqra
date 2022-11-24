const db = require('../models/admin');
const Statement = db.statement;

exports.create = async (req, res) => {
    console.log(req.body);
    Statement.create(req.body).then(data => {
        res.send(
            {
                message: "One statement added successfully",
            }
        );
    }).catch(err => {
        res.send(err);
        console.log(err);
    });
}

exports.findAll = async (req, res) => {
    Statement.findAll().then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.send(err);
        console.log(err);
    }
    );
}