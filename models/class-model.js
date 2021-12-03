const mongoose = require("mongoose")
const Schema = mongoose.Schema

const classSchema = new Schema({
  name: String,
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
  photos: [
    {
      src: String,
      alt: String,
    },
  ],
  tags: [String],
  date: Date,
})

const CraftClass = mongoose.model("CraftClass", classSchema)

module.exports = CraftClass
