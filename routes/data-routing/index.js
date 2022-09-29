const router = require("express").Router()
const dataRouting = require("./data-routing.js")

router.use("/data_routing", dataRouting)

module.exports = router
