const getDictionary = callback => {
  $.ajax({
    type: "GET",
    url: "/api/dictionary",
    context: this,
  })
    .then(data => {
      // console.log(data)
      if (callback) {
        callback(data)
      }
    })
    .catch(err => {
      console.warn(err)
      callback()
    })
}

const testDictionary = callback => {
  $.ajax({
    type: "GET",
    url: "/api/dictionary/test",
    context: this,
  })
    .then(data => {
      // console.log(data)
      if (callback) {
        callback(data)
      }
    })
    .catch(err => {
      console.warn(err)
      callback()
    })
}

const sendWordArrayToDictionary = (wordArray, callback) => {
  $.ajax({
    type: "POST",
    url: "/api/dictionary/test",
    context: this,
    data: { wordArray: wordArray },
  })
    .then(data => {
      // console.log(data)
      if (callback) {
        callback(data)
      }
    })
    .catch(err => {
      console.warn(err)
      callback()
    })
}
