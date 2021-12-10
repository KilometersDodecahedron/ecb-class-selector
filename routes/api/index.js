const router = require("express").Router()
const inquiryRoutes = require("./inquiry.js")
const craftClassRoutes = require("./craft-class.js")
const tagRoutes = require("./tags")
const testRoutes = require("./test")

router.use("/craft_class", craftClassRoutes)
router.use("/inquiry", inquiryRoutes)
router.use("/tag", tagRoutes)
router.use("/test", testRoutes)

module.exports = router
