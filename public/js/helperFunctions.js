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

const INTERNAL_isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) =>
  scrollWidth > clientWidth || scrollHeight > clientHeight

// called in "script"
const HELPER_resizeText = ({
  element,
  elements,
  minSize = 10,
  maxSize = 512,
  step = 1,
  unit = "px",
}) => {
  ;(elements || [element]).forEach(el => {
    let i = minSize
    let overflow = false

    const parent = el.parentNode

    el.setAttribute("backgroud-color", "red")
    while (!overflow && i < maxSize) {
      el.style.fontSize = `${i}${unit}`
      overflow = INTERNAL_isOverflown(parent)

      if (!overflow) i += step
    }

    // revert to last state where no overflow happened
    el.style.fontSize = `${i - step}${unit}`
  })
}

function HELPER_preventCrossSiteScripting(_string) {
  let check1 = _string.replaceAll("<", "〘")
  let check2 = check1.replaceAll(">", "〙")
  let check3 = check2.replaceAll("(", "〘")
  let check4 = check3.replaceAll(")", "〙")
  let check5 = check4.replaceAll("{", "〘")
  let check6 = check5.replaceAll("}", "〙")
  let check7 = check6.replaceAll("*", "⭐")
  let check8 = check7.replaceAll(";", ":")
  let check9 = check8.replaceAll("$", "﹩")
  let check10 = check9.replaceAll("&", " and ")
  let check11 = check10.replaceAll("[", "〘")
  let check12 = check11.replaceAll("]", "〙")
  let check13 = check12.replaceAll("SELECT", "select")
  let check14 = check13.replaceAll("FROM", "from")
  let check15 = check14.replaceAll("=", " equals ")
  let check16 = check15.replaceAll("WHERE", "where")
  let check17 = check16.replaceAll("OR", "or")
  let check18 = check17.replaceAll("\\", "⑊")

  return check18
}

const HELPER_removeExtraLineBreaks = _text => {
  let newText = _text.replaceAll("<p><br></p>", "")
  return newText
}

function HELPER_getAll2DArrayCombinations(list, n = 0, result = [], current = []) {
  if (n === list.length) {
    result.push(current)
  } else {
    list[n].forEach(item => {
      HELPER_getAll2DArrayCombinations(list, n + 1, result, [...current, item])
    })
  }

  return result
}
