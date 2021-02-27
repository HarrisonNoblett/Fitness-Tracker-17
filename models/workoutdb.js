const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name of your workout"
  },
  type: {
    type: String,
    required: "Enter the type of workout"
  },
  weight: {
    type: Number,
    required: "Enter the weight"
  },
  sets: {
    type: Number,
    required: "Enter the amount of sets"
  },
  reps: {
    type: Number,
    required: "Enter the number of reps"
  },
  duration: {
    type: Number,
    type: String,
    required: "Enter the the duration of you workout"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;