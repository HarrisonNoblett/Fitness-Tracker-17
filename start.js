const express = require("express");
const mongojs = require("mongojs");
const Workout = require("./models/workoutdb.js");

const app = express();

const databaseUrl = "workout";
const collections = ["workout"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/all", (req, res) => {
  db.workouts.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

app.get("/api/workouts/")
// 1: Name: Send JSON response sorted by name in ascending order, e.g. GET "/name"
app.get("/name", (req, res) => {
  db.workouts.find({}, (err, data) => {
    console.log(data)
  })
})
// 2: Weight: Send JSON response sorted by weight in descending order, , e.g. GET "/weight"
app.get("/weight", (req, res) => {
  db.workouts.find({}, )
})
// Set the app to listen on port 3000
app.listen(3000, () => {
  console.log("App running on port 3000!");
});