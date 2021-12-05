const router = require("express").Router()
const classController = require("../../controllers/class_controller.js")

router.route("/").get(classController.getAllClasses)

module.exports = router
