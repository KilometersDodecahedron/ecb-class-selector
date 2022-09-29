const emailConfirmationToClient = (_data, _callback) => {
  $.ajax({
    type: "POST",
    url: "/api/email/client",
    dataType: "json",
    data: _data,
  })
    .then(data => {
      console.log(data)
      if (_callback) {
        _callback(data)
      }
    })
    .catch(err => console.warn(err))
}

const emailInquiryToOwner = (_data, _callback) => {
  $.ajax({
    type: "POST",
    url: "/api/email/owner",
    dataType: "json",
    data: _data,
  })
    .then(data => {
      console.log(data)
      if (_callback) {
        _callback(data)
      }
    })
    .catch(err => console.warn(err))
}
