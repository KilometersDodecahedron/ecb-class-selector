const router = require("express").Router()
const emailController = require("../../controllers/email_controller.js")

router.route("/client").post(emailController.emailConfirmationToClient)
router.route("/owner").post(emailController.emailInquiryToOwner)

module.exports = router
