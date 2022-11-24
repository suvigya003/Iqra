require("dotenv").config();
const express = require("express");
const cors = require("cors");

const adminRoutes = require("./routes/admin/admin.routes");
const userRoutes = require("./routes/user/user.routes");
const teacherRoutes = require("./routes/teacher/teacher.routes");
const studentRoutes = require("./routes/student/student.routes");

const app = express();

var corsOptions = {
  origin: "*",
};

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Database is synced");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running" });
});

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
