const mongoose = require("mongoose")
const Schema = mongoose.Schema

const InquirySchema = new Schema({
  idOfRequestedClass: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  phoneNumberType: {
    type: String,
    required: true,
    enum: ["cell", "landline"],
  },
  classType: {
    type: String,
    required: true,
    enum: ["virtual", "in person", "virtual no kit"],
  },
  requestedDate: {
    type: Date,
    required: true,
  },
  requestedTime: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  location: {
    locationType: {
      type: String,
      required: true,
      enum: ["ECB", "Women's Club", "Host Venue"],
    },
    hostAddress: String,
  },
  ageGroup: {
    type: String,
    required: true,
    enum: ["adult", "child", "mixed"],
  },
  comments: String,
  date: { type: Date, default: Date.now },
})

const Inquiry = mongoose.model("Inquiry", InquirySchema)

module.exports = Inquiry
