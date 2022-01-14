const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PhotoSchema = new Schema({
  src: String,
  alt: String,
})

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  duration: {
    string: String,
    num: Number,
  },
  disclaimer: String,
  availability: {
    virtual: Boolean,
    virtualNoKit: Boolean,
    inPerson: Boolean,
  },
  allowedLocations: {
    virtualOnly: Boolean,
    boutique: Boolean,
    montclairWomanClub: Boolean,
    customVenue: Boolean,
  },
  price: {
    hasOnePrice: Boolean,
    singlePrice: String,
    priceForSearchFunction: Number,
    multiplePrices: {
      virtual: {
        available: Boolean,
        price: String,
      },
      virtualNoKit: {
        available: Boolean,
        price: String,
      },
      inPerson: {
        available: Boolean,
        price: String,
      },
    },
  },
  minimumParticipants: {
    hasMinimum: Boolean,
    minimum: Number,
  },
  ageGroup: {
    adult: Boolean,
    child: Boolean,
    mixed: Boolean,
  },
  photos: [PhotoSchema],
  video: {
    hasVideo: Boolean,
    link: String,
  },
  tags: [String],
  dateCreated: { type: Date },
  dateLastUpdated: { type: Date, default: Date.now },
})

const CraftClass = mongoose.model("CraftClass", classSchema)

module.exports = CraftClass
