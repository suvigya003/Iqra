const db = require("../../models");
const Student = db.student;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = require("../../middleware/register.js");
const login = require("../../middleware/login.js");

const SALT = 10;

exports.register = async (req, res) => {
  try {
    console.log(req.body);
    const checkBody = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };
    const { error } = register.registerValidate(checkBody);
    if (error) {
      console.log(error);
      return res.status(400).send(error.details[0].message);
    }
    const student = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (student) {
      return res.status(400).send("student already registered.");
    }
    const salt = await bcrypt.genSalt(SALT);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await Student.create({
      ...req.body,
      password: hashedPassword,
    });
    res.send({ data: req.body });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const checkBody = {
      email: req.body.email,
      password: req.body.password,
    };
    const { error } = login.loginValidate(checkBody);
    if (error) {
      console.log(error);
      return res.status(400).send(error.details[0].message);
    }
    const student = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!student) {
      return res.status(400).send("Invalid email or password.");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      student.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid email or password.");
    }
    res.send({
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.findAll = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
