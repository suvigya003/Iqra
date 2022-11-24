const db = require('../models/admin');
const Tags = db.tags;

exports.create = async (req, res) => {
    console.log(req.body);
    Tags.create(req.body).then(data => {
        res.send(
            {
                message: "One tag added successfully",
            }
        );
    }).catch(err => {
        res.send(err);
        console.log(err);
    });
}

exports.findAll = async (req, res) => {
    Tags.findAll().then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.send(err);
        console.log(err);
    }
    );
}