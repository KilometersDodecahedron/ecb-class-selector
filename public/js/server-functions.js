const testButton = document.querySelector("#test-connection")

const testPost = () => {
  $.ajax({
    type: "POST",
    url: "/api/test/create",
    dataType: "json",
    data: {
      name: "Fourth",
      favoriteFood: "salmon",
    },
  })
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
}

const testGet = () => {
  $.ajax({
    type: "GET",
    url: "/api/test",
    context: this,
  })
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
}

// you don't need the : in the url
const testGetByID = () => {
  $.ajax({
    type: "GET",
    url: "/api/test/61b10e618e8e4f336c9971bc",
    context: this,
  })
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
}

const testUpdate = () => {
  $.ajax({
    type: "PUT",
    url: "/api/test/update/61b10e618e8e4f336c9971bc",
    context: this,
    data: { name: "not first" },
  })
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
}

const testDelete = () => {
  $.ajax({
    type: "DELETE",
    url: "/api/test/delete/61b10e550a144abd0ae28951",
    context: this,
  })
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
}

testButton.addEventListener("click", testGet)
