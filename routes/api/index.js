const router = require("express").Router()
const inquiryRoutes = require("./inquiry.js")
const craftClassRoutes = require("./craft-class.js")
const tagRoutes = require("./tags")
const emailRoutes = require("./email")
const categoryRoutes = require("./category")
const mediaSliderRoutes = require("./media-sliders")
const testRoutes = require("./test")

router.use("/craft_class", craftClassRoutes)
router.use("/inquiry", inquiryRoutes)
router.use("/tag", tagRoutes)
router.use("/email", emailRoutes)
router.use("/category", categoryRoutes)
router.use("/media_slider", mediaSliderRoutes)
router.use("/test", testRoutes)

module.exports = router
