const fs = require("fs")
const path = require("path")
const dictionaryEn = require("dictionary-en")
const nspell = require("nspell")

const testFunction = (req, res) => {
  console.log(req.body)
  dictionaryEn((err, language) => {
    if (err) throw err

    var spell = nspell(language)

    console.log(spell.correct("colour")) // => false
    console.log(spell.suggest("colour")) // => ['color']
    console.log(spell.correct("color")) // => true
    console.log(spell.correct("npm")) // => false
  })
  res.json("Test successful")
}

const testPostFunction = (req, res) => {
  let wordArray = req.body.wordArray
  dictionaryEn((err, language) => {
    if (err) throw err

    const spell = nspell(language)

    let responseObject = { responseWordArray: [] }

    wordArray.forEach(word => {
      let wordObject = {}
      wordObject.spelling = spell.correct(word)
      wordObject.suggestions = spell.suggest(word)
      responseObject.responseWordArray.push(wordObject)
    })

    res.send(responseObject)
  })
}

const sendDictionary = (req, res) => {
  //   console.log(path.join(__dirname, "en_US"))
  //   var options = {
  //     root: path.join(__dirname, "../en_US"),
  //     dotfiles: "deny",
  //     headers: {
  //       "x-timestamp": Date.now(),
  //       "x-sent": true,
  //     },
  //   }
  //   res.sendFile("TEST.html", options, err => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log("Sent")
  //     }
  //   })
  res.download(path.resolve("./en_US/en_US.dic"))
}

module.exports = { testFunction, testPostFunction, sendDictionary }
