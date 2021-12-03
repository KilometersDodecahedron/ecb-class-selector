var express = require("express")
var exphbs = require("express-handlebars")
const mongoose = require("mongoose")

var routes = require("./controllers/class_controller.js")

var PORT = process.env.PORT || 8080

var app = express()

app.use(express.static("public"))

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

app.use(routes)

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT)
})
