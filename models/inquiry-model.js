const mongoose = require("mongoose")
const Schema = mongoose.Schema

const InquirySchema = new Schema({
  nameOfRequestedClass: {
    type: String,
    required: true,
  },
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
  participants: {
    type: Number,
    required: true,
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
  localTime: {
    type: String,
    required: true,
  },
  localDate: {
    type: Date,
    required: true,
  },
  location: {
    locationType: {
      type: String,
      required: true,
      enum: ["ECB", "Women's Club", "Host Venue", "Virtual"],
    },
    hostAddress: String,
  },
  ageGroup: {
    type: String,
    required: true,
    enum: ["Adult", "Child", "Mixed"],
  },
  giftOption: {
    type: Boolean,
    required: true,
  },
  comments: String,
  date: { type: Date, default: Date.now },
})

const Inquiry = mongoose.model("Inquiry", InquirySchema)

module.exports = Inquiry
