const db = require('../../models');
const Faq = db.faq;

exports.create = async (req, res) => {
    try{
        const faq = await Faq.create(req.body);
        res.send(faq);
    }catch(error){
        console.log(error);
    }
};

exports.findAll = async (req, res) => {
    try{
        const faqs = await Faq.findAll();
        res.send(teachers);
    }catch(error){
        console.log(error);
    }
}

