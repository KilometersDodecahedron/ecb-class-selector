function removeAllChildNodes(parent) {
  if (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  } else {
    console.warn("No child nodes found to remove")
  }
}

function clearArray(array) {
  while (array.length) {
    array.pop()
  }
}

function goToTopOfPage() {
  window.scroll({
    top: 0,
    left: 0,
    // behavior: "smooth",
  })
}

// for displaying time
const formatAMPM = date => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes.toString().padStart(2, "0")
  let strTime = hours + ":" + minutes + " " + ampm
  return strTime
}

function HELPER_convertArmyTimeToEST(armyTimeString, timezone, date) {
  let [hours, minutes] = armyTimeString.split(":")

  date = new Date(date)
  let requestedDateAndTime = new Date(date.setHours(hours))
  requestedDateAndTime.setMinutes(minutes)
  let localDateAndTime = new Date(requestedDateAndTime)

  let requestedDateString = `${
    requestedDateAndTime.getMonth() + 1
  }/${requestedDateAndTime.getDate()}/${requestedDateAndTime.getFullYear()}`

  let requestedTimeString = formatAMPM(requestedDateAndTime)

  let localDateString = requestedDateString
  let localTimeString = requestedTimeString

  if (timezone && timezone != "-05:00") {
    let _hourOffset = Number(timezone.split(":")[0]) + 5

    let _minuteOffset = Number(timezone.split(":")[1])

    if (_minuteOffset > 0) _hourOffset--

    _minuteOffset = (_minuteOffset / 50) * 30

    localDateAndTime.setHours(localDateAndTime.getHours() + _hourOffset)
    localDateAndTime.setMinutes(localDateAndTime.getMinutes() + _minuteOffset)

    localDateString = `${
      localDateAndTime.getMonth() + 1
    }/${localDateAndTime.getDate()}/${localDateAndTime.getFullYear()}`

    localTimeString = formatAMPM(localDateAndTime)
  }

  return minutes
    ? [requestedTimeString, localTimeString, requestedDateString, localDateString]
    : [undefined, undefined, undefined, undefined]
}

function validMail(mail) {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
    mail
  )
}

function validPhoneNumber(phoneNumber) {
  return /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phoneNumber)
}

function HELPER_capitalizeFirstLetter(_string) {
  return _string.charAt(0).toUpperCase() + _string.slice(1)
}

function HELPER_randomizeArray(_array) {
  let randomizedArray = _array.sort(() => Math.random() - 0.5)
  return randomizedArray
}
