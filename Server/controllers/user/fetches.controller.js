const db = require("../../models");
const DailyNews = db.dailyNews;
const ImportantEditorials = db.importantEditorials;
const MoreLinks = db.moreLinks;

exports.getDailyNews = async (req, res) => {
  try {
    const date = req.params.date;

    const dailyNews = await DailyNews.findAll({
      where: {
        date: date,
      },
    });

    if (!dailyNews) {
      res.status(400).send({
        message: "Daily news articles not found for this date",
      });
    } else {
      res.send({ data: dailyNews });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getImportantEditorials = async (req, res) => {
  try {
    const date = req.params.date;

    const importantEditorials = await ImportantEditorials.findAll({
      where: {
        date: date,
      },
    });

    if (!importantEditorials) {
      res.status(400).send({
        message: "Important editorials not found for this date",
      });
    } else {
      res.send(importantEditorials);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getMoreLinks = async (req, res) => {
  try {
    const date = req.params.date;

    const moreLinks = await MoreLinks.findAll({
      where: {
        date: date,
      },
    });

    if (!moreLinks) {
      res.status(400).send({
        message: "Links not found for this date",
      });
    } else {
      res.send(moreLinks);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
