const router = require("express").Router()
const dictionaryController = require("../../controllers/dictionary_controller.js")

router.route("/test").get(dictionaryController.testFunction)
router.route("/test").post(dictionaryController.testPostFunction)
router.route("/").get(dictionaryController.sendDictionary)

module.exports = router
