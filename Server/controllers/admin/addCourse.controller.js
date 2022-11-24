const db = require('../../models');
const formidable = require('formidable');
const cloudinary = require('../../configs/cloudinary.config');
const AddCourse = db.addCourse;

exports.create = async (req, res) => {
    try{
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: "Image could not be uploaded"
                });
            }
            if(!(Object.keys(files).length > 0)){
                return res.status(400).json({
                    error: "Image is required"
                });
            }
            const {courseName, price,subjectName,heading, description,lessons,courseDuration,level,medium} = fields;
            console.log('file', files.image.filepath);

            cloudinary.uploader.upload(files.image.filepath, (err, result) => {     
                console.log(result);
                AddCourse.create({
                    image: result.secure_url,
                    courseName:courseName,
                    price:price,
                    subjectName:subjectName,
                    heading:heading,
                    description:description,
                    lessons:lessons,
                    level:level,
                    medium:medium,
                    courseDuration:courseDuration,
                }). 
                then(data => {
                    res.status(200).send({
                        message: "Course added successfully"
                    });
                }).
                catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the ProductImage."
                    });
                });
            });
        });
    }catch(error){
        console.log(error);
    }
};

exports.findAll = async (req, res) => {
    try{
        const addCourse = await AddCourse.findAll();
        res.send(addCourse);
    }catch(error){
        console.log(error);
    }
}


// exports.create = async (req, res) => {
//     try{
//         const addCourse = await AddCourse.create(req.body);
//         res.send(addCourse);
//     }catch(error){
//         console.log(error);
//     }
// };

// exports.findAll = async (req, res) => {
//     try{
//         const addCourses = await AddCourse.findAll();
//         res.send(addCourses);
//     }catch(error){
//         console.log(error);
//     }
// }

