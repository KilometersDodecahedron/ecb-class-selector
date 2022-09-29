const getAllCategories = callback => {
  $.ajax({
    type: "GET",
    url: "/api/category",
    context: this,
  })
    .then(data => {
      console.log(data)
      if (callback) {
        callback(data)
      }
    })
    .catch(err => {
      console.warn(err)
      callback()
    })
}

const postCategory = (_data, callback) => {
  let postData = _data
  postData.dateCreated = Date.now()

  $.ajax({
    type: "POST",
    url: "/api/category/create",
    dataType: "json",
    data: postData,
  })
    .then(data => {
      console.log(data)
      if (callback) {
        callback(data)
      }
    })
    .catch(err => {
      console.warn(err)
      callback()
    })
}

const deleteCategory = (id, callback) => {
  $.ajax({
    type: "DELETE",
    url: "/api/category/delete/" + id,
    context: this,
  })
    .then(data => {
      console.log(data)
      if (callback) {
        callback(data)
      }
    })
    .catch(err => {
      console.warn(err)
      callback()
    })
}
