const router = require("express").Router()
const testController = require("../../controllers/test-controller")

router.route("/").get(testController.testRead)

router.route("/:id").get(testController.testReadById)

router.route("/create").post(testController.testCreate)

router.route("/update/:id").put(testController.testUpdate)

router.route("/delete/:id").delete(testController.testDelete)

module.exports = router
