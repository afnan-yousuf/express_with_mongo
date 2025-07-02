const express = require("express");
const app = express();

//MongoDB instance
const mongo = require("mongoose");
const bcrypt = require("bcryptjs");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To my API");
});

//Student Working
const Student = require("./models/student");
//Reading Students
app.get("/student", async (req, res) => {
  try {
    const std = await Student.find();
    res.send(std);
  } catch (error) {
    res.status(400).send("Student not found");
  }
});

//Add New Student
app.post("/student", async (req, res) => {
  const newStd = new Student(req.body);
  await newStd
    .save()
    .then(() => {
      res.send({ msg: "Student saved", success: true });
    })
    .catch((error) => {
      res.send({ msg: "Student failed to saved", success: false });
    });
});

app.put("/student/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const stdtoUpdate = await Student.findByIdAndUpdate(id, newData);
    res.send({ msg: "Student Updated", success: true });
  } catch (error) {
    res.send({ msg: `Student Not Updated ${error}`, success: false });
  }
});

app.delete("/student/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const stdtoUpdate = await Student.findByIdAndDelete(id, newData);
    res.send({ msg: "Student Deteled", success: true });
  } catch (error) {
    res.send({ msg: `Student Not Deleted ${error}`, success: false });
  }
});
//Student Working

const User = require("./models/user");

app.get("/users", async (req, res) => {
  try {
    const u = await User.find();
    res.send(u);
  } catch (error) {
    res.status(400).send("Student not found");
  }
});

app.post("/users", async (req, res) => {
  const newUser = new User(req.body);
  if (newUser.age < 18 && newUser.age > 50) {
    return res.send({
      msg: "Your age is not between 18 and 50",
      success: false,
    });
  }
  newUser.password = await bcrypt.hash(newUser.password, 10);
  await newUser
    .save()
    .then(() => {
      res.send({ msg: "User saved", success: true });
    })
    .catch((error) => {
      res.send({ msg: "User failed to saved", success: false });
    });
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ msg: "User Not Found", success: false });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.send({ msg: "Invalid Password", success: false });
  }
  const time = new Date()
  await User.findByIdAndUpdate(user.id, {lastlogin: time} );
  return res.send({ msg: "Welcome to System", success: true });
});

app.listen(5000, () => {
  console.log("Application Started");
  mongo
    .connect("mongodb://localhost:27017/ourclassdb", {})
    .then(() => {
      console.log("Database Connected");
    })
    .catch(() => {
      console.log("Database connection failed");
    });
});
