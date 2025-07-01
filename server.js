const express = require("express");
const app = express();

//MongoDB instance
const mongo = require("mongoose");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To my API");
});

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

app.put('/student/:id', async (req,res) => {
    const { id } = req.params;
    const newData = req.body;
    try{
      const stdtoUpdate = await Student.findByIdAndUpdate(id,newData)
      res.send({msg: 'Student Updated', success: true})
    }
    catch(error){
      res.send({msg: `Student Not Updated ${error}`, success: false})
    }
})

app.delete('/student/:id', async (req,res) => {
    const { id } = req.params;
    const newData = req.body;
    try{
      const stdtoUpdate = await Student.findByIdAndDelete(id,newData)
      res.send({msg: 'Student Deteled', success: true})
    }
    catch(error){
      res.send({msg: `Student Not Deleted ${error}`, success: false})
    }
})

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
