const db = require("../models")
const express = require("express")
const router = express.Router()

module.exports = {
  testRead: function (req, res) {
    db.Test.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  testReadById: function (req, res) {
    console.log("hi")
    db.Test.findOne({ _id: req.params.id })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  testCreate: function (req, res) {
    db.Test.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  testUpdate: function (req, res) {
    db.Test.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  testDelete: function (req, res) {
    db.Test.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
}
