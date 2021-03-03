//REQUIRING THE MODULES
const express = require("express");
const mongojs = require("mongojs");
const Workout = require("./models/workoutdb.js");
const path = require("path")
var PORT = process.env.PORT || 3000;
const app = express();

const databaseUrl = "workout";
const collections = ["workout"];

//BRINGING IN MONGO.JS
const db = mongojs(databaseUrl, collections);
app.use(express.static("public"));

db.on("error", error => {
  console.log("Database Error:", error);
});

//CONNECTING TO THE HTML PAGES
app.get("/", (req, res) => {
  res.send("index.html");
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"))
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"))
})

//USING A GET REQUEST TO FIND THE WORKOUTS
app.post("/stats", (req, res) => {
  db.workouts.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
      db.workouts.update({"_id": req.params.id}, {$push: {"workouts": { $each: [req.body]}}})
    }
    res.json(data)
  });
});

//USING A GET REWUEST TO FIN A CERTAIN WORKOUT FROM THE ID
app.get("/api/workouts/:id", (req, res) => {
  console.log(req.params.id)
  db.workouts.find({"_id": req.params.id}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data)
      res.json(data);
    }
  })
})

app.post("/api/workouts", (req, res) =>{
  Workout.create({})
  .then((dbWorkout) => {
    res.json(dbWorkout)
  }) .catch(err => {
    res.json(err)})
})

//USING A GET REQUEST TO GET ALL OF THE WORKOUTS 
app.get("/api/workouts", (req, res) => {
  db.workouts.find({}, (err, data) => {
    console.log(data)
    res.json(data)
  })
})

//USING A POST REQUEST TO POST A NEW WORKOUT TO THE EXERCISE PAGE
app.post("/exercise", (req, res) => {
  db.workouts.find({}, (err, data) => {
    console.log(data)
    res.json(data)
  })
})

//USING A PUT REQUEST TO UPDATE THE EXERCISE IN THE WORKOUT
app.put("/api/workouts/:id/", async (req, res) => {
  db.workouts.find({"_id": req.params.id}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data)
      db.workouts.update({"_id": req.params.id}, {$push: {"exercises": { $each: [req.body]}}})
    }
    res.json(data)
  })
})

app.listen(PORT, () => {
  console.log("App running on port 3000!");
});