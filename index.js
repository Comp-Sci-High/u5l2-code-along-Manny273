const express = require("express");
// import your mongoose
const mongoose = require("mongoose")
// install your mongoose

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// create a studentSchema with name, grade, advisory, and fav subject
const studentSchema = new mongoose.Schema({
  name:{type:String, required:true},
  grade:{type:Number, required:true},
  favSubject:{type:String, required:true}
})
// connect your schema to a model called Student
const Student = mongoose.model("Student", studentSchema, "Students")
// create a route hanlder for /g12 that returns every student in grade 12
app.get("/g12", async(req,res) =>{
  const students = await Student.find({grade:12})
  res.json(students)
})
// (OYO) create a route hanlder for /me that returns yourself without using your name in the query
app.get("/me", async(req,res) =>{
  const me = await Student.find({grade:12,favSubject:"apcsa"})
  res.json(me)
})
// (OYO) create a route hanlder for /friend that returns someone at your table using their name in the query
app.get("/friend", async(req,res) =>{
  const student = await Student.find({name:"Brandon"})
  res.json(student)
})
// Write an async function called startServer
// inside make sure to connect to mongoose w/ your SRV string
// (make sure your call you name your database myClass!)
// Save a document to mongoDB about yourself 
// (OYO) save 2 more documents about students at your table
// make sure to start your server 
async function startServer(){
  await mongoose.connect("mongodb+srv://SE12:CSH2025@cluster0.xfcbvkb.mongodb.net/codealong?retryWrites=true&w=majority&appName=Cluster0")

  const me = new Student({
    name :"Emanuel",
    favSubject :"apcsa",
    grade:12
  }).save()
  const student1 = new Student({
    name :"Brandon",
    favSubject :"Software Engineering",
    grade:12
  }).save()
  const student2 = new Student({
    name :"laila",
    favSubject :"Calculus",
    grade:12
  }).save()
  app.listen(3000, ()=>{
    console.log("Server is running")
  })
}

// call startServer
startServer()
// if you finished all the excersizes try these 
