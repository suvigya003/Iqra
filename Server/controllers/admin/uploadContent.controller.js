const db = require('../../models');
const UploadContent = db.uploadContent;

exports.create = async (req, res) => {
    try{
        const uploadContent = await UploadContent.create(req.body);
        res.send(uploadContent);
    }catch(error){
        console.log(error);
    }
};

exports.findAll = async (req, res) => {
    try{
        const uploadContents = await UploadContent.findAll();
        res.send(uploadContents);
    }catch(error){
        console.log(error);
    }
}

