const express = require("express");
const mongojs = require("mongojs");
const Workout = require("./models/workoutdb.js");
const path = require("path")

const app = express();

const databaseUrl = "workout";
const collections = ["workout"];

const db = mongojs(databaseUrl, collections);
app.use(express.static("public"));

db.on("error", error => {
  console.log("Database Error:", error);
});

app.get("/", (req, res) => {
  res.send("index.html");
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"))
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/pubic/stats.html"))
})
app.get("/api/stats", (req, res) => {
  db.workouts.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

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

app.get("/api/workouts", (req, res) => {
  db.workouts.find({}, (err, data) => {
    console.log(data)
    res.json(data)
  })
})

app.post("/exercise", ({body}, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

app.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


app.get("/name", (req, res) => {
  db.workouts.find({}, (err, data) => {
    console.log(data)
  })
})

app.get("/weight", (req, res) => {
  db.workouts.find({}, )
})

app.listen(3000, () => {
  console.log("App running on port 3000!");
});