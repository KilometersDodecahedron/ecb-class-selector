const testButton = document.querySelector("#test-connection")

const testPost = () => {
  $.ajax({
    type: "POST",
    url: "/api/test/create",
    dataType: "json",
    data: {
      name: "second",
      favoriteFood: "pizza",
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

testButton.addEventListener("click", testGet)
