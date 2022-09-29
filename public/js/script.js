const searchBar = document.querySelector("#searchBar")
const searchButton = document.querySelector("#searchButton")
const classDisplayHolder = document.querySelector(".class-display")
const numberButtonHolderTop = document.querySelector("[number-button-holder-top]")
const numberButtonHolderBottom = document.querySelector("[number-button-holder-bottom]")

const displayTemplate = document.querySelector("#display-template")
const numberButtonTemplate = document.querySelector("#number-button-template")
const numberButtonArrayTop = []
const numberButtonArrayBottom = []

// class names for assigning click functions
const viewClassButtonClassName = "btn-class-view"
const categoryButtonDropdownClassName = "browse-by-category"
const tagButtonDropdownClassName = "browse-by-tag"
const numberNavButtonClassName = "btn-class-nav"

const maxClassesPerPage = 12
// track the current page number
let currentPageNumber = 1
// TODO store all classes here, then sort and filter classes in listOfClassesThatFitSearch
let allClasses = []
let listOfClassesThatFitSearch = []

const fetchClassData = (key, value, isEmbeddedBool) => {
  getAllClasses(_data => {
    document.querySelector(".bootstrap-mod--nav-holder").classList.remove("d-none")
    document.querySelector("#site-navigation").classList.remove("d-none")

    allClasses = _data
    sortOrder = localStorage.getItem("sortOrder")
    if (sortOrder == null) {
      sortOrder = "newest"
      localStorage.setItem("sortOrder", sortOrder)
    }

    if (paramManager.getParametersFunction("sort") != null) {
      sortOrder = paramManager.getParametersFunction("sort")
      localStorage.setItem("sortOrder", sortOrder)
    }
    console.log(SEARCHbyString(allClasses, "e"))

    if (key == "searchTerm") {
      listOfClassesThatFitSearch = SEARCHbyString(allClasses, value)
      searchFunctions.search.displayKeySearchInTitle(key, value)
    } else if (!key) {
      listOfClassesThatFitSearch = allClasses
    } else if (isEmbeddedBool == "true") {
      listOfClassesThatFitSearch = SEARCHageGroup(allClasses, value)
      searchFunctions.search.displayKeySearchInTitle(key, value)
    } else {
      listOfClassesThatFitSearch = SEARCHbyKey(allClasses, key, value)
      searchFunctions.search.displayKeySearchInTitle(key, value)
    }

    // check search area

    sortThenDisplay(sortOrder)
  })
}

const sortThenDisplay = sortOrder => {
  console.log(sortOrder == '"duration"')
  switch (sortOrder) {
    case "newest":
      listOfClassesThatFitSearch = SORTbyRecent(listOfClassesThatFitSearch, true)
      break
    case '"newest"':
      listOfClassesThatFitSearch = SORTbyRecent(listOfClassesThatFitSearch, true)
      break
    case "name":
      listOfClassesThatFitSearch = SORTbyName(listOfClassesThatFitSearch, true)
      break
    case '"name"':
      listOfClassesThatFitSearch = SORTbyName(listOfClassesThatFitSearch, true)
      break
    case "duration":
      listOfClassesThatFitSearch = SORTbyDuration(listOfClassesThatFitSearch, true)
      break
    case '"duration"':
      listOfClassesThatFitSearch = SORTbyDuration(listOfClassesThatFitSearch, true)
      break
    case "price":
      listOfClassesThatFitSearch = SORTbyPrice(listOfClassesThatFitSearch, true)
      break
    case '"price"':
      listOfClassesThatFitSearch = SORTbyPrice(listOfClassesThatFitSearch, true)
      break
    default:
      console.log("?")
      listOfClassesThatFitSearch = SORTbyRecent(listOfClassesThatFitSearch, true)
      break
  }

  searchFunctions.sort.highlightSortOrder(sortOrder)

  displayCurrentSetOfClasses()
}

const setClassList = () => {
  getAllClasses(_data => {
    classList = _data
    console.log(classList)
  })
}

const displayCurrentSetOfClasses = () => {
  if (!classDisplayHolder) return
  removeAllChildNodes(classDisplayHolder)
  // this will count down
  let startingPoint = (currentPageNumber - 1) * maxClassesPerPage

  for (let i = 0; i < maxClassesPerPage; i++) {
    let currentIndex = i + startingPoint

    if (currentIndex < listOfClassesThatFitSearch.length) {
      classDisplayHolder.appendChild(createClassDisplayFromTemplate(currentIndex))
    }
  }
  if (listOfClassesThatFitSearch.length > maxClassesPerPage) {
    populateNumberButtons()
  }
}

const populateNumberButtons = () => {
  if (!numberButtonHolderBottom) return
  removeAllChildNodes(numberButtonHolderBottom)
  removeAllChildNodes(numberButtonHolderTop)
  clearArray(numberButtonArrayTop)
  clearArray(numberButtonArrayBottom)
  currentPageNumber = 1

  const numberOfPages = Math.ceil(listOfClassesThatFitSearch.length / maxClassesPerPage)

  for (let i = 0; i < numberOfPages; i++) {
    let newNumberButton = createNumberButtonsFromTemplate(i + 1)
    numberButtonArrayTop.push(newNumberButton.querySelector("button"))
    numberButtonHolderTop.append(newNumberButton)
  }

  for (let i = 0; i < numberOfPages; i++) {
    let newNumberButton = createNumberButtonsFromTemplate(i + 1)
    numberButtonArrayBottom.push(newNumberButton.querySelector("button"))
    numberButtonHolderBottom.append(newNumberButton)
  }

  numberButtonChangeStyleOfCurrentPageNumber()
}

const TESTsearchBarDisplay = document.querySelector("#searchBarTest")

// triggers when search bar value changes
const searchBarChangeEvent = e => {
  TESTsearchBarDisplay.innerHTML = e.target.value
}
// searchBar.addEventListener("input", searchBarChangeEvent)

const createClassDisplayFromTemplate = index => {
  // todo
  const classDisplayClone = displayTemplate.content.cloneNode(true)
  const previewImage = classDisplayClone.querySelector(".class-preview-img")
  const classNameDisplay = classDisplayClone.querySelector(".class-name")
  const tagDisplay = classDisplayClone.querySelector(".class-preview-tag-display")
  const durationDisplay = classDisplayClone.querySelector(".class-preview-duration-display")
  const priceDisplay = classDisplayClone.querySelector(".class-preview-price-display")
  const difficultyDisplay = classDisplayClone.querySelector(".class-preview-difficulty-display")
  const displayButton = classDisplayClone.querySelector(".btn-class-view")

  previewImage.src = listOfClassesThatFitSearch[index].photos[0].src
  previewImage.alt = listOfClassesThatFitSearch[index].photos[0].alt
  tagDisplay.innerHTML = listOfClassesThatFitSearch[index].tags[0]
  durationDisplay.innerHTML = listOfClassesThatFitSearch[index].duration.string
  difficultyDisplay.innerHTML = listOfClassesThatFitSearch[index].difficulty
  displayButton.dataset.classNumber = index
  classNameDisplay.innerHTML = listOfClassesThatFitSearch[index].name

  if (
    listOfClassesThatFitSearch[index].price.priceForSearchFunction.lowRange ==
    listOfClassesThatFitSearch[index].price.priceForSearchFunction.highRange
  ) {
    priceDisplay.innerHTML = `$${listOfClassesThatFitSearch[index].price.priceForSearchFunction.lowRange}`
  } else {
    priceDisplay.innerHTML = `$${listOfClassesThatFitSearch[index].price.priceForSearchFunction.lowRange} - $${listOfClassesThatFitSearch[index].price.priceForSearchFunction.highRange}`
  }

  return classDisplayClone
}

const createNumberButtonsFromTemplate = number => {
  if (!numberButtonTemplate) return
  const numberButtonClone = numberButtonTemplate.content.cloneNode(true)
  const numberButtonButton = numberButtonClone.querySelector("button")

  numberButtonButton.innerHTML = number
  numberButtonButton.dataset.pageNumber = number

  return numberButtonClone
}

const viewClassButtonFunction = e => {
  if (
    !e.target.classList.contains(viewClassButtonClassName) ||
    e.target.classList.contains(mediaScrollerFunctions.cardButtonClassString)
  )
    return

  // TODO pass data from button to modal
  processClassData(listOfClassesThatFitSearch[e.target.dataset.classNumber])

  modalDisplay.holder.classList.add("modal-holder--visible")
  modalDisplay.holder.classList.remove("modal-holder--invisible")
  modalRequest.holder.classList.add("invisible")
  modalRequest.resetInputFields()
}

const numberButtonChangeStyleOfCurrentPageNumber = () => {
  for (let i = 0; i < numberButtonArrayBottom.length; i++) {
    let currentButton = numberButtonArrayBottom[i]
    currentButton.dataset.pageNumber == currentPageNumber
      ? currentButton.classList.add("btn-number-current-page")
      : currentButton.classList.remove("btn-number-current-page")
  }

  for (let i = 0; i < numberButtonArrayTop.length; i++) {
    let currentButton = numberButtonArrayTop[i]
    currentButton.dataset.pageNumber == currentPageNumber
      ? currentButton.classList.add("btn-number-current-page")
      : currentButton.classList.remove("btn-number-current-page")
  }
}

const browseByCategoryButtonFunction = e => {
  if (!e.target.classList.contains(categoryButtonDropdownClassName)) return

  console.log("Category")
}

const browseByTagButtonFunction = e => {
  if (!e.target.classList.contains(tagButtonDropdownClassName)) return

  console.log("tag")
}

const numberNavButtonFunction = e => {
  if (!e.target.classList.contains(numberNavButtonClassName)) return

  currentPageNumber = e.target.dataset.pageNumber
  numberButtonChangeStyleOfCurrentPageNumber()
  goToTopOfPage()

  displayCurrentSetOfClasses()
}
const displayBasedOnPathParams = () => {
  let _key = paramManager.getParametersFunction("key")
  let _value = paramManager.getParametersFunction("value")
  let _isEmbeddedBool = paramManager.getParametersFunction("isEmbeddedBool")
  let _isHomePage = paramManager.getParametersFunction("isHomePage")
  console.log(_key, _value, _isEmbeddedBool)
  if (_isHomePage) {
    mediaScrollerFunctions.populateMediaScrollers()
    searchFunctions.search.startSearchButton.classList.remove("d-none")
  } else {
    fetchClassData(_key, _value, _isEmbeddedBool)
  }
}

// all functionality assigned to buttons
const masterClickEventForBody = e => {
  viewClassButtonFunction(e)
  browseByCategoryButtonFunction(e)
  browseByTagButtonFunction(e)
  numberNavButtonFunction(e)
  mediaScrollerFunctions.viewClassButtonFunction(e)
}

displayBasedOnPathParams()

document.querySelector("body").onclick = masterClickEventForBody
