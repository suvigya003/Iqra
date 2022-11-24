const db = require('../models/admin');
const Options = db.options;

exports.create = async (req, res) => {
    console.log(req.body);
    Options.create(req.body).then(data => {
        res.send(
            {
                message: "One option added successfully",
            }
        );
    }).catch(err => {
        res.send(err);
        console.log(err);
    });
}

exports.findAll = async (req, res) => {
    Options.findAll().then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.send(err);
        console.log(err);
    }
    );
}