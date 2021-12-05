const router = require("express").Router()
const testController = require("../../controllers/test-controller")

router.route("/").get(testController.testRead)

router.route("/create").post(testController.testCreate)

router.route("/update").put(testController.testUpdate)

router.route("/delete").delete(testController.testDelete)

module.exports = router
