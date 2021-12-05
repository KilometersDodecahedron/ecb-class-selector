const router = require("express").Router()
const craftClassRoutes = require("./craft-class.js")
const testRoutes = require("./test")

router.use("/craft_class", craftClassRoutes)
router.use("/test", testRoutes)

module.exports = router
