// Carousel Elements
const carouselTrack = document.querySelector(".modal-carousel-track")
const carouselRightArrowButton = document.querySelector(".modal-carousel-button--right")
const carouselLeftArrowButton = document.querySelector(".modal-carousel-button--left")
const carouselDotsNavHolder = document.querySelector(".modal-carousel-nav")

let carouselSlidesArray = Array.from(carouselTrack.children)
let carouselDotsArray = Array.from(carouselDotsNavHolder.children)
const carouselSlideTemplate = document.querySelector("#carouselSlideTemplate")
const carouselDotTemplate = document.querySelector("#carouselNavButton")

let currentClassID = ""
let currentClassName = ""

// Modal Display Elements
const modalDisplay = {
  holder: document.querySelector(".modal-holder"),
  name: document.querySelector(".modal-class-name"),
  description: document.querySelector(".modal-class-description"),
  duration: document.querySelector(".modal-class-duration"),
  disclaimer: document.querySelector(".modal-class-disclaimer"),
  availability: document.querySelector(".modal-class-availability"),
  price: document.querySelector(".modal-class-price"),
  minimumParticipants: document.querySelector(".modal-class-minimum-participants"),
  ageGroup: document.querySelector(".modal-class-recomended-age-group"),
  previewVideo: document.querySelector(".modal-class-preview-video"),
  previewVideoHolder: document.querySelector(".modal-class-preview-video-holder"),
  requestButton: document.querySelector(".modal-class-request-class-btn"),
  closeButton: document.querySelector(".modal-x-btn"),
}

// input labels to turn red when not filled
const essentialFieldsForWarning = {
  firstName: document.querySelector(".essential-field-first-name"),
  lastName: document.querySelector(".essential-field-last-name"),
  email: document.querySelector(".essential-field-email"),
  phoneNumber: document.querySelector(".essential-field-phone-number"),
  participants: document.querySelector(".essential-field-participants"),
  date: document.querySelector(".essential-field-date"),
  time: document.querySelector(".essential-field-time"),
  address: document.querySelector(".essential-field-address"),
  resetWarningDisplays: () => {
    essentialFieldsForWarning.firstName.classList.remove("essential-field-unfilled")
    essentialFieldsForWarning.lastName.classList.remove("essential-field-unfilled")
    essentialFieldsForWarning.email.classList.remove("essential-field-unfilled")
    essentialFieldsForWarning.phoneNumber.classList.remove("essential-field-unfilled")
    essentialFieldsForWarning.participants.classList.remove("essential-field-unfilled")
    essentialFieldsForWarning.date.classList.remove("essential-field-unfilled")
    essentialFieldsForWarning.time.classList.remove("essential-field-unfilled")
    essentialFieldsForWarning.address.classList.remove("essential-field-unfilled")
  },
}

// Modal Request Elements  for
const modalRequest = {
  holder: document.querySelector(".request-form-holder"),
  form: document.querySelector(".request-form"),
  firstName: document.querySelector("#first-name"),
  lastName: document.querySelector("#last-name"),
  email: document.querySelector("#email"),
  phoneNumber: document.querySelector("#tel"),
  phoneNumberOptions: {
    cellphone: document.querySelector("#cellphone-type"),
    landline: document.querySelector("#landline-type"),
  },
  participants: document.querySelector("#participants"),
  classTypeHolder: document.querySelector("#class-type-holder"),
  classType: {
    virtual: document.querySelector("#class-type-virtual"),
    inPerson: document.querySelector("#class-type-inperson"),
    virtualNoKit: document.querySelector("#class-type-virtual-no-kit"),
    virtualHolder: document.querySelector("#class-type-virtual-holder"),
    inPersonHolder: document.querySelector("#class-type-inperson-holder"),
    virtualNoKitHolder: document.querySelector("#class-type-virtual-no-kit-holder"),
  },
  date: document.querySelector("#date"),
  time: document.querySelector("#time"),
  timezone: document.querySelector("#timezone-offset"),
  timezoneHolders: document.querySelector("#timezone-offset-holder"),
  location: {
    holder: document.querySelector("#event-location-radio-holder"),
    store: document.querySelector("#location-store"),
    club: document.querySelector("#location-club"),
    host: document.querySelector("#location-host"),
    hostAddress: document.querySelector("#location-address"),
    storeHolder: document.querySelector("#location-store-holder"),
    clubHolder: document.querySelector("#location-club-holder"),
    hostHolder: document.querySelector("#location-host-holder"),
    specialHostRadioButtonHolder: document.querySelector(
      "#location-host-radio-button-holder-for-when-only-custom-locations-are-allowed"
    ),
  },
  ageGroup: {
    holder: document.querySelector("#age-group-holder"),
    adult: document.querySelector("#adult-age"),
    child: document.querySelector("#child-age"),
    mixed: document.querySelector("#mixed-age"),
    adultHolder: document.querySelector("#adult-age-holder"),
    childHolder: document.querySelector("#child-age-holder"),
    mixedHolder: document.querySelector("#mixed-age-holder"),
  },
  giftOption: {
    yes: document.querySelector("#gift-option-yes"),
    no: document.querySelector("#gift-option-no"),
  },
  comments: document.querySelector("#request-form-option-name"),
  submitButton: document.querySelector("#submit-button"),
  setAlternatingRequestColors: () => {
    let alternateColorTracker = false
    alternatingColorRequestArray.forEach(element => {
      if (!element.classList.contains("invisible")) {
        if (alternateColorTracker) {
          element.classList.add("request-form-color-group-two")
          element.classList.remove("request-form-color-group-one")
          alternateColorTracker = false
        } else {
          element.classList.remove("request-form-color-group-two")
          element.classList.add("request-form-color-group-one")
          alternateColorTracker = true
        }
      } else {
        element.classList.remove("request-form-color-group-two")
        element.classList.remove("request-form-color-group-one")
      }
    })
  },
  processClassRequestInputOptions: data => {
    // class type
    modalRequest.classTypeHolder.classList.add("invisible")
    modalRequest.classType.virtualHolder.classList.add("invisible")
    modalRequest.classType.inPersonHolder.classList.add("invisible")
    modalRequest.classType.virtualNoKitHolder.classList.add("invisible")
    let availabilityTracker = 0

    if (data.availability.virtualNoKit) {
      availabilityTracker++
      modalRequest.classType.virtualNoKitHolder.classList.remove("invisible")
      modalRequest.classType.virtualNoKit.checked = true
    }
    if (data.availability.inPerson) {
      availabilityTracker++
      modalRequest.classType.inPersonHolder.classList.remove("invisible")
      modalRequest.classType.inPerson.checked = true
    }
    if (data.availability.virtual) {
      availabilityTracker++
      modalRequest.classType.virtualHolder.classList.remove("invisible")
      modalRequest.classType.virtual.checked = true
    }
    if (availabilityTracker > 1) {
      modalRequest.classTypeHolder.classList.remove("invisible")
      console.log(modalRequest.classTypeHolder.classList)
    }

    // timezone
    if (data.availability.virtual == false && data.availability.virtualNoKit == false) {
      modalRequest.timezoneHolders.classList.add("invisible")
    } else {
      modalRequest.timezoneHolders.classList.remove("invisible")
    }
    // age
    modalRequest.ageGroup.holder.classList.add("invisible")
    modalRequest.ageGroup.adultHolder.classList.add("invisible")
    modalRequest.ageGroup.childHolder.classList.add("invisible")
    modalRequest.ageGroup.mixedHolder.classList.add("invisible")
    let ageTracker = 0

    if (data.ageGroup.mixed) {
      ageTracker++
      modalRequest.ageGroup.mixedHolder.classList.remove("invisible")
      modalRequest.ageGroup.mixed.checked = true
    }
    if (data.ageGroup.child) {
      ageTracker++
      modalRequest.ageGroup.childHolder.classList.remove("invisible")
      modalRequest.ageGroup.child.checked = true
    }
    if (data.ageGroup.adult) {
      ageTracker++
      modalRequest.ageGroup.adultHolder.classList.remove("invisible")
      modalRequest.ageGroup.adult.checked = true
    }
    if (ageTracker > 1) {
      modalRequest.ageGroup.holder.classList.remove("invisible")
    }
    // venue
    modalRequest.location.holder.classList.add("invisible")
    modalRequest.location.storeHolder.classList.add("invisible")
    modalRequest.location.clubHolder.classList.add("invisible")
    modalRequest.location.hostHolder.classList.add("invisible")
    modalRequest.location.specialHostRadioButtonHolder.classList.add("invisible")
    let locationTracker = 0

    if (!data.allowedLocations.virtualOnly) {
      if (data.allowedLocations.customVenue) {
        locationTracker++
        modalRequest.location.hostHolder.classList.remove("invisible")
        modalRequest.location.specialHostRadioButtonHolder.classList.remove("invisible")
        modalRequest.location.host.checked = true
        modalRequest.location.host.checked = true
      }
      if (data.allowedLocations.montclairWomanClub) {
        locationTracker++
        modalRequest.location.clubHolder.classList.remove("invisible")
        modalRequest.location.club.checked = true
      }
      if (data.allowedLocations.boutique) {
        locationTracker++
        modalRequest.location.storeHolder.classList.remove("invisible")
        modalRequest.location.store.checked = true
      }
      if (locationTracker > 1) {
        modalRequest.location.holder.classList.remove("invisible")
      } else if (data.allowedLocations.customVenue) {
        // so they can give an address if only custom venues are allowed
        modalRequest.location.holder.classList.remove("invisible")
        modalRequest.location.specialHostRadioButtonHolder.classList.add("invisible")
      }
    }
    modalRequest.setAlternatingRequestColors()
  },
  resetInputFields: () => {
    modalRequest.firstName.value = ""
    modalRequest.lastName.value = ""
    modalRequest.email.value = ""
    modalRequest.phoneNumber.value = ""
    modalRequest.phoneNumberOptions.cellphone.checked = true
    modalRequest.participants.value = ""
    modalRequest.date.value = ""
    modalRequest.time.value = ""
    requestFormTimezoneDropdown[8].selected = "selected"
    modalRequest.location.hostAddress.value = ""
    modalRequest.giftOption.no.checked = true
    modalRequest.comments.value = ""
    essentialFieldsForWarning.resetWarningDisplays()
  },
  getFormData: () => {
    let _phoneNumberType = modalRequest.phoneNumberOptions.cellphone.checked ? "cell" : "landline"

    let _classType = ""
    if (modalRequest.classType.virtual.checked) _classType = "virtual"
    else if (modalRequest.classType.inPerson.checked) _classType = "in person"
    else if (modalRequest.classType.virtualNoKit.checked) _classType = "virtual no kit"

    let [estTime, localTime, estDate, localDate] = HELPER_convertArmyTimeToEST(
      modalRequest.time.value,
      modalRequest.timezone.value,
      modalRequest.date.value
    )

    let _ageGroup = ""
    if (modalRequest.ageGroup.child.checked) _ageGroup = "Child"
    else if (modalRequest.ageGroup.adult.checked) _ageGroup = "Adult"
    else if (modalRequest.ageGroup.mixed.checked) _ageGroup = "Mixed"

    let _location = ""
    let _address = "NA"
    if (_classType == "virtual" || _classType == "virtual no kit") {
      _location = "Virtual"
    } else if (modalRequest.location.store.checked) {
      _location = "ECB"
    } else if (modalRequest.location.club.checked) {
      _location = "Women's Club"
    } else if (modalRequest.location.host.checked) {
      _location = "Host Venue"
      _address = modalRequest.location.hostAddress.value
    }

    const formData = {
      nameOfRequestedClass: currentClassName,
      idOfRequestedClass: currentClassID,
      firstName: modalRequest.firstName.value,
      lastName: modalRequest.lastName.value,
      email: modalRequest.email.value,
      phoneNumber: Number(modalRequest.phoneNumber.value),
      phoneNumberType: _phoneNumberType,
      participants: Number(modalRequest.participants.value),
      classType: _classType,
      requestedDate: estDate,
      requestedTime: estTime,
      timezone: modalRequest.timezone.value,
      localDate: localDate,
      localTime: localTime,
      ageGroup: _ageGroup,
      giftOption: modalRequest.giftOption.yes.checked,
      location: {
        locationType: _location,
        hostAddress: _address,
      },
      comments: modalRequest.comments.value,
    }
    return formData
  },
  checkIfAllNecessaryInfoIsPresent: _formData => {
    let errorDiscovered = false
    console.log(_formData)
  },
  submitButtonFunction: () => {
    let _data = modalRequest.getFormData()
    modalRequest.checkIfAllNecessaryInfoIsPresent(_data)
    postInquiry(_data)
  },
}

const alternatingColorRequestArray = modalRequest.holder.querySelectorAll(
  ".request-form-color-group"
)

let carouselSlideWidth = carouselSlidesArray[0].getBoundingClientRect().width
const carouselState = {
  currentSlideIndex: 0,
  setCurrentSlideIndex: value => {
    carouselState.currentSlideIndex = value
    setCarouselSlidePosition()
  },
}

// Request Form Elements
const requestFormTimezoneDropdown = document.querySelector("#timezone-offset")

modalDisplay.closeButton.addEventListener("click", function () {
  modalDisplay.holder.classList.remove("modal-holder--visible")
  modalDisplay.holder.classList.add("modal-holder--invisible")
})

const setCarouselDisplayClasses = () => {
  carouselSlidesArray.forEach((slide, index) => {
    if (index == carouselState.currentSlideIndex) {
      slide.classList.add("modal-carousel-slide--current-slide")
    } else {
      slide.classList.remove("modal-carousel-slide--current-slide")
    }
  })

  carouselDotsArray.forEach((dot, index) => {
    if (index == carouselState.currentSlideIndex) {
      dot.classList.add("modal-carousel-indicator--current-slide")
    } else {
      dot.classList.remove("modal-carousel-indicator--current-slide")
    }
  })
}

const setCarouselSlidePosition = () => {
  carouselSlideWidth = carouselSlidesArray[0].getBoundingClientRect().width
  carouselSlidesArray.forEach((slide, index) => {
    slide.style.left = carouselSlideWidth * (index - carouselState.currentSlideIndex) + "px"
  })
  setCarouselDisplayClasses()
}

setCarouselSlidePosition()

window.addEventListener("resize", e => {
  setCarouselSlidePosition()
})

carouselRightArrowButton.addEventListener("click", e => {
  const currentSlide = carouselTrack.querySelector(".modal-carousel-slide--current-slide")
  const nextSlide = currentSlide.nextElementSibling || carouselSlidesArray[0]
  const newSlideIndex = carouselSlidesArray.indexOf(nextSlide)
  carouselState.setCurrentSlideIndex(newSlideIndex)

  //   console.log(newSlideIndex)
})

carouselLeftArrowButton.addEventListener("click", e => {
  const currentSlide = carouselTrack.querySelector(".modal-carousel-slide--current-slide")
  const previousSlideIndex = carouselSlidesArray.indexOf(currentSlide) - 1
  const newSlideIndex =
    previousSlideIndex >= 0 ? previousSlideIndex : carouselSlidesArray.length - 1
  carouselState.setCurrentSlideIndex(newSlideIndex)
})

const assignFunctionToDotButtons = () => {
  carouselDotsArray.forEach((dot, index) => {
    dot.addEventListener("click", e => {
      const newSlideIndex = dot.dataset.carouselIndex
      carouselState.setCurrentSlideIndex(newSlideIndex)
    })
  })
}

assignFunctionToDotButtons()

// makes the datepicker work
$(function () {
  $("#date").datepicker()
})

// console.log(requestFormTimezoneDropdown)
// requestFormTimezoneDropdown.innerHTML = ""
TimezoneList.forEach(timezone => {
  let newTimezone = document.createElement("option")
  newTimezone.setAttribute("value", timezone.value)
  newTimezone.innerHTML = timezone.text
  if (timezone.selected) newTimezone.setAttribute("selected", timezone.selected)
  requestFormTimezoneDropdown.appendChild(newTimezone)
})

// populate class data
// get the info

// helper functions
const processClassAvailability = availability => {
  const availableArray = []

  if (availability.virtual) availableArray.push("Virtual, ")
  if (availability.inPerson) availableArray.push("In Person, ")

  let availabileString = availableArray.join("")
  availabileString = `Available: ${availabileString.substring(0, availabileString.length - 2)}`

  return availabileString
}

const processClassPricing = price => {
  let priceString = ""

  if (price.hasOnePrice) {
    priceString = `Price: ${price.singlePrice}`
  } else {
    if (price.multiplePrices.virtual.available) {
      priceString += `<div>Virtual Price: ${price.multiplePrices.virtual.price}</div>`
    }
    if (price.multiplePrices.virtualNoKit.available) {
      priceString += `<div>Virtual (No Kit) Price: ${price.multiplePrices.virtualNoKit.price}</div>`
    }
    if (price.multiplePrices.inPerson.available) {
      priceString += `<div>In Person Price: ${price.multiplePrices.inPerson.price}</div>`
    }
  }

  return priceString
}

const processClassMinimumParticipants = minimumParticipants => {
  let minimumParticipantsString = ""

  if (minimumParticipants.hasMinimum) {
    minimumParticipantsString = `Minimum Participants: ${minimumParticipants.minimum}`
    modalDisplay.minimumParticipants.classList.remove("invisible")
  } else {
    modalDisplay.minimumParticipants.classList.add("invisible")
  }

  return minimumParticipantsString
}

const processClassAge = age => {
  const ageArray = []

  if (age.adult) ageArray.push("Adult, ")
  if (age.child) ageArray.push("Child, ")
  if (age.mixed) ageArray.push("Mixed, ")

  let ageString = ageArray.join("")
  ageString = `Age Group: ${ageString.substring(0, ageString.length - 2)}`

  return ageString
}

const processClassPhotos = photos => {
  // empty the parent elements
  carouselTrack.innerHTML = ""
  carouselDotsNavHolder.innerHTML = ""
  // empty tracking arrays
  carouselSlidesArray = []
  carouselDotsArray = []
  // create foreach loop for photos parameter
  photos.forEach((item, index) => {
    //  create new from elements template
    let newPhotoElement = carouselSlideTemplate.content.cloneNode(true).firstElementChild
    let newDotElement = carouselDotTemplate.content.cloneNode(true).firstElementChild
    //  apply data & stylings from each index to elements
    let innerPhotoElement = newPhotoElement.querySelector(".modal-carousel-image")
    innerPhotoElement.src = item.src
    innerPhotoElement.alt = item.alt

    newDotElement.setAttribute("data-carousel-index", index)

    if (index == 0) {
      newPhotoElement.classList.add("modal-carousel-slide--current-slide")
      newDotElement.classList.add("modal-carousel-indicator--current-slide")
    }

    //  append new elements to holders
    carouselTrack.appendChild(newPhotoElement)
    carouselDotsNavHolder.appendChild(newDotElement)
    //  add new elements to tracking arrays
    carouselSlidesArray.push(newPhotoElement)
    carouselDotsArray.push(newDotElement)
    //  add events to new nav buttons
    assignFunctionToDotButtons()
  })
}

const processClassVideos = video => {
  modalDisplay.previewVideo.classList.add("invisible")

  if (video.hasVideo) {
    modalDisplay.previewVideo.classList.remove("invisible")
    modalDisplay.previewVideo.src = video.link
  }
}

const processClassRequestInputOptions = data => {}

const processClassData = data => {
  modalDisplay.name.innerHTML = data.name
  modalDisplay.description.innerHTML = data.description
  modalDisplay.duration.innerHTML = `Duration: ${data.duration.string}`
  modalDisplay.disclaimer.innerHTML = `Please note: ${data.disclaimer}`
  modalDisplay.availability.innerHTML = processClassAvailability(data.availability)
  modalDisplay.price.innerHTML = processClassPricing(data.price)
  modalDisplay.minimumParticipants.innerHTML = processClassMinimumParticipants(
    data.minimumParticipants
  )
  modalDisplay.ageGroup.innerHTML = processClassAge(data.ageGroup)
  currentClassID = data._id
  currentClassName = data.name
  processClassPhotos(data.photos)
  processClassVideos(data.video)
  modalRequest.processClassRequestInputOptions(data)
}

modalRequest.submitButton.addEventListener("click", e => {
  e.preventDefault()
  // TODO make submit data
  modalRequest.submitButtonFunction()
})

// request button toggle
modalDisplay.requestButton.addEventListener("click", e => {
  modalRequest.holder.classList.toggle("invisible")
})

modalRequest.setAlternatingRequestColors()
