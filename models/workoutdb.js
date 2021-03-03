//REQUIRING MONGOOS
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//CREATING THE WORKOUT SCHEMA
const workoutSchema = new Schema({
  name: {
    type: String,
    trim: true,
    //required: "Enter a name of your workout"
  },
  type: {
    type: String,
    //required: "Enter the type of workout"
  },
  weight: {
    type: Number,
    //required: "Enter the weight"
  },
  sets: {
    type: Number,
    //required: "Enter the amount of sets"
  },
  reps: {
    type: Number,
    //required: "Enter the number of reps"
  },
  duration: {
    type: Number,
    type: String,
    //required: "Enter the the duration of you workout"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//CREATING THE WORKOUT VARIABLE AND EXPORTING IT
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;