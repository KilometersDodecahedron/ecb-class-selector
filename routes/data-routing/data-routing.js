const router = require("express").Router()

router.get("/:key", function (req, res) {
  res.render(path.join(__dirname, "../views/index.handlebars"))
  // console.log(req.params.key)
})

module.exports = router
