var express = require("express")
var exphbs = require("express-handlebars")
const mongoose = require("mongoose")

var routes = require("./routes")

var PORT = process.env.PORT || 6060

var app = express()

app.use(express.static("public"))

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

app.use(routes)

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/class_database").catch(err => {
  console.error(err)
})

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://127.0.0.1:" + PORT)
})
