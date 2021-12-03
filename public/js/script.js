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

const maxClassesPerPage = 15
// track the current page number
let currentPageNumber = 1
let listOfClassesThatFitSearch = []

const fetchClassData = () => {
  // TODO make Asynch to pull data from AWS
  listOfClassesThatFitSearch = returnClassData()
  displayCurrentSetOfClasses()
  if (listOfClassesThatFitSearch.length > maxClassesPerPage) {
    populateNumberButtons()
  }
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

const createClassDisplayFromTemplate = index => {
  // todo
  const classDisplayClone = displayTemplate.content.cloneNode(true)
  const previewImage = classDisplayClone.querySelector(".class-preview-img")
  const classNameDisplay = classDisplayClone.querySelector(".class-name")

  previewImage.src = listOfClassesThatFitSearch[index].imgSrc
  classNameDisplay.innerHTML = listOfClassesThatFitSearch[index].name

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
  if (!e.target.classList.contains(viewClassButtonClassName)) return

  // TODO pass data from button to modal
  processClassData(TestClass)

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

// all functionality assigned to buttons
const masterClickEventForBody = e => {
  viewClassButtonFunction(e)
  browseByCategoryButtonFunction(e)
  browseByTagButtonFunction(e)
  numberNavButtonFunction(e)
}

fetchClassData()

document.querySelector("body").onclick = masterClickEventForBody
