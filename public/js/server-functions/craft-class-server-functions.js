const testButton2 = document.querySelector("#test-connection-class")

const postClass = _data => {
  $.ajax({
    type: "POST",
    url: "/api/craft_class/create",
    dataType: "json",
    data: _data,
  })
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
}

const getAllClasses = () => {
  $.ajax({
    type: "GET",
    url: "/api/craft_class",
    context: this,
  })
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
}

const updateClass = () => {
  $.ajax({
    type: "PUT",
    url: "/api/craft_class/update/61b3c7f1a9c8fb536be99149",
    context: this,
    data: {
      duration: {
        string: "2 to 3 hours",
        num: 2,
      },
    },
  })
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
}

const deleteClass = () => {
  $.ajax({
    type: "DELETE",
    url: "/api/craft_class/delete/61b3c7f1a9c8fb536be99149",
    context: this,
  })
    .then(data => {
      console.log(data)
    })
    .catch(err => console.log(err))
}

testButton2.addEventListener("click", () => {
  //   console.log(testStructuredData)
  //   postClass(testStructuredData)
  getAllClasses()
})
