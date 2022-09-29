const path = require("path")
const router = require("express").Router()
const apiRoutes = require("./api")
const dataRouting = require("./data-routing")

// const mainAppPath = path.join(__dirname, "../views/layouts/main.handlebars")
// console.log(mainAppPath)

// router.use(function (req, res) {
//   res.render(mainAppPath)
// })

router.use("/api", apiRoutes)
// router.use("/data_routing", dataRouting)

// router.use("/:key", function (req, res) {
//   res.render(path.join(__dirname, "../views/index.handlebars"))
//   console.log(req.params.key)
// })
router.use("/", function (req, res) {
  res.render(path.join(__dirname, "../views/index.handlebars"))
})

module.exports = router
