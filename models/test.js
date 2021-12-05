const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  favoriteFood: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Test = mongoose.model("Test", TestSchema)

module.exports = Test
