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
  dateTimeFallbackOptions: {
    secondChoice: {
      requestedDate: {
        type: Date,
      },
      requestedTime: {
        type: String,
      },
      localTime: {
        type: String,
      },
      localDate: {
        type: Date,
      },
    },
    thirdChoice: {
      requestedDate: {
        type: Date,
      },
      requestedTime: {
        type: String,
      },
      localTime: {
        type: String,
      },
      localDate: {
        type: Date,
      },
    },
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
    enum: ["Adult", "Teen", "Child", "Mixed"],
  },
  giftOption: {
    type: Boolean,
    required: true,
  },
  comments: String,
  date: { type: Date, default: Date.now },
  // processing variables
  processed: {
    status: {
      type: String,
      default: "New",
      enum: ["New", "Pending", "Booked", "Completed", "Canceled"],
    },
    dates: {
      respondedAndPending: {
        type: String,
        default: "",
      },
      booked: {
        type: String,
        default: "",
      },
      completed: {
        type: String,
        default: "",
      },
      canceled: {
        type: String,
        default: "",
      },
    },
    responseEmailBody: String,
    customMessage: String,
    paymentLink: String,
    notesForPending: String,
    dateSelected: String,
    hasSentResponseAferCompletedClass: {
      type: Boolean,
      default: false,
    },
  },
})

const Inquiry = mongoose.model("Inquiry", InquirySchema)

module.exports = Inquiry
