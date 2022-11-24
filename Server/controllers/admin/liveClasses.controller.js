const db = require('../../models');
const LiveClasses = db.liveClasses;

exports.create = async (req, res) => {
    try{
        const liveClasses = await LiveClasses.create(req.body);
        res.send(liveClasses);
    }catch(error){
        console.log(error);
    }
};

exports.findAll = async (req, res) => {
    try{
        const liveClassess = await LiveClasses.findAll();
        res.send(liveClassess);
    }catch(error){
        console.log(error);
    }
}

