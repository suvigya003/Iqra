const cloudinary = require("../../configs/cloudinary.config");
const formidable = require("formidable");

const db = require("../../models");
const DailyNews = db.dailyNews;
const ImportantEditorials = db.importantEditorials;
const MoreLinks = db.moreLinks;

exports.addDailyNews = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, file) => {
      if (err) {
        res.status(400).send({
          error: "Error adding daily news article",
        });
      }
      if (!(Object.keys(file).length > 0)) {
        res.status(400).send({
          message: "Please provide an image file",
        });
      }

      if (
        fields.date.length === 0 ||
        fields.title.length === 0 ||
        fields.readingTime.length === 0 ||
        fields.tag.length === 0 ||
        fields.subtags.length === 0 ||
        fields.body.length === 0
      ) {
        res.status(400).send({
          message: "Kindly fill all fields",
        });
      } else {
        const { date, title, readingTime, tag, subtags, body } = fields;
        cloudinary.uploader.upload(file.image.filepath, (err, result) => {
          DailyNews.create({
            date: date,
            title: title,
            readingTime: readingTime,
            tag: tag,
            subtags: subtags,
            body: body,
            image: result.secure_url,
          })
            .then((data) => {
              res.status(200).send({
                message: "Daily news article added sucessfully",
              });
            })
            .catch((err) => {
              res.status(500).send({
                message: "Database error",
              });
            });
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      error: "Internal server error",
    });
  }
};

exports.addImportantEditorials = async (req, res) => {
  try {
    if (
      req.body.date === undefined ||
      req.body.title === undefined ||
      req.body.readingTime === undefined ||
      req.body.tag === undefined ||
      req.body.subtags === undefined ||
      req.body.videoLink === undefined ||
      req.body.body === undefined
    ) {
      res.status(400).send({
        message: "Kindly fill all fields",
      });
    } else {
      await ImportantEditorials.create({
        ...req.body,
      });
      res.send({ message: "Important editorial added successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.addMoreLinks = async (req, res) => {
  try {
    if (
      req.body.date === undefined ||
      req.body.title === undefined ||
      req.body.body === undefined
    ) {
      res.status(400).send({
        message: "Kindly fill all fields",
      });
    } else {
      await MoreLinks.create({
        ...req.body,
      });
      res.send({ message: "Link added successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
