// tells it how to structure
const db = require("../models")
const express = require("express")
const router = express.Router()

// router.get("/", (req, res) => {
//   res.render("index")
// })

module.exports = {
  getAllClasses: function (req, res) {
    db.CraftClass.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
}
