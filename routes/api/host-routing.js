const router = require("express").Router()

router.get("/:key", function (req, res) {
  let hostListJSON = process.env.ALLOWED_HOSTING_LINK
  let hostListObject = JSON.parse(hostListJSON)
  if (hostListObject[`${req.params.key}`]) {
    res.send(hostListObject[`${req.params.key}`])
  } else {
    res.send(null)
  }
})

module.exports = router
