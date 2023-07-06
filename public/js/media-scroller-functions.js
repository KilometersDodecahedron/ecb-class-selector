const mediaScrollerFunctions = {
  cardButtonClassString: "media-scroller--card-button",
  maxNumberOfClassesDisplayed: 8,
  // template card
  displayTemplate: document.querySelector("#display-template"),
  // template media scroller
  mediaScrollerTemplate: document.querySelector("#mediaScrollerTemplate"),
  // holder
  holderElement: document.querySelector("#media-scroller--big-holder"),
  // display list array
  scrollerTypeArray: [
    {
      sectionName: "Reiki",
      queryParams: { category: "Reiki" },
    },
    {
      sectionName: "Christmas",
      queryParams: { tags: "Christmas" },
    },
  ],
  allClasses: [],
  // holds data to populate sliders
  scrollerClassDataArray: [],
  // used to populate data in modal
  classDataArray: [],
  // called in "script"
  populateMediaScrollers: () => {
    getAllFeatured(displayData => {
      displayData = displayData.sort((a, b) => (a.displayNumber > b.displayNumber ? 1 : -1))
      getAllClasses(classData => {
        mediaScrollerFunctions.allClasses = classData
        displayData.forEach(scrollerDbEntry => {
          mediaScrollerFunctions.populateScrollerClassDataArray(scrollerDbEntry)
        })
        mediaScrollerFunctions.scrollerClassDataArray.forEach((itemCategory, indexCategory) => {
          let newMediaScroller =
            mediaScrollerFunctions.mediaScrollerTemplate.content.cloneNode(true)
          let mediaTitle = newMediaScroller.querySelector(".media-scroller--title")
          let mediaHolder = newMediaScroller.querySelector(".media-scroller")
          mediaTitle.innerHTML = itemCategory.sectionName
          // populate
          itemCategory.classesThatFitSearch.forEach((itemClass, indexClass) => {
            let newCard = mediaScrollerFunctions.createClassDisplayFromTemplate(itemClass, {
              indexCategory,
              indexClass,
            })
            mediaHolder.appendChild(newCard)
          })
          mediaScrollerFunctions.holderElement.appendChild(newMediaScroller)
        })
        HELPER_resizeText({ elements: document.querySelectorAll(".class-name") })
      })
    })
  },
  populateScrollerClassDataArray: scrollerDbEntry => {
    let _sectionName = ""
    let _classesThatFitSearch = []
    if (scrollerDbEntry.type == "category") {
      _classesThatFitSearch = mediaScrollerFunctions.allClasses.filter(_class => {
        return _class.category == scrollerDbEntry.mainData
      })
      _sectionName = scrollerDbEntry.mainData
    } else if (scrollerDbEntry.type == "tag") {
      _classesThatFitSearch = mediaScrollerFunctions.allClasses.filter(_class => {
        let check = false
        for (let i = 0; i < _classesThatFitSearch.length; i++) {}
        _class.tags.forEach(_tag => {
          if (_tag == scrollerDbEntry.mainData) {
            check = true
          }
        })
        return check
      })
      _sectionName = scrollerDbEntry.mainData
    } else if (scrollerDbEntry.type == "other") {
      _classesThatFitSearch = mediaScrollerFunctions.otherTypeProcessor(scrollerDbEntry)
      _sectionName = mediaScrollerFunctions.otherNameProcessor(scrollerDbEntry)
    }

    // randomize order, or sort by most recently created
    if (scrollerDbEntry.randomizeOrder) {
      _classesThatFitSearch = HELPER_randomizeArray(_classesThatFitSearch)
    } else if (scrollerDbEntry.mainData != "Popular") {
      _classesThatFitSearch = _classesThatFitSearch.sort((a, b) =>
        a.dateCreated > b.dateCreated ? -1 : 1
      )
    }

    if (_classesThatFitSearch.length > 0) {
      if (_classesThatFitSearch.length > mediaScrollerFunctions.maxNumberOfClassesDisplayed) {
        _classesThatFitSearch = _classesThatFitSearch.slice(
          0,
          mediaScrollerFunctions.maxNumberOfClassesDisplayed - 1
        )
      }
      mediaScrollerFunctions.classDataArray.push(_classesThatFitSearch)
      mediaScrollerFunctions.scrollerClassDataArray.push({
        sectionName: _sectionName,
        classesThatFitSearch: _classesThatFitSearch,
      })
    }
  },
  otherNameProcessor: scrollerDbEntry => {
    let _sectionName = ""
    if (scrollerDbEntry.mainData == "Popular") {
      _sectionName = "Most Popular"
    } else if (scrollerDbEntry.mainData == "Price") {
      _sectionName = `Classes Under $${scrollerDbEntry.secondaryData}`
    } else if (scrollerDbEntry.mainData == "Experience Level") {
      _sectionName = `${scrollerDbEntry.secondaryData} Difficulty Classes`
    } else if (scrollerDbEntry.mainData == "Age Group") {
      if (scrollerDbEntry.secondaryData == "mixed") {
        _sectionName = "Classes for Families"
      } else if (scrollerDbEntry.secondaryData == "child") {
        _sectionName = `Classes for Children`
      } else if (scrollerDbEntry.secondaryData == "adult") {
        _sectionName = `Classes for Adults`
      }
    } else if (scrollerDbEntry.mainData == "Newest") {
      _sectionName = "Newly Added"
    } else if (scrollerDbEntry.mainData == "Best Sellers") {
      _sectionName = "Editor's Choice"
    }

    return _sectionName
  },
  otherTypeProcessor: scrollerDbEntry => {
    let _classesThatFitSearch = []
    if (scrollerDbEntry.mainData == "Popular") {
      _classesThatFitSearch = mediaScrollerFunctions.allClasses.filter(
        _class => _class.numberOfInquiriesSent
      )
      _classesThatFitSearch = _classesThatFitSearch.sort((a, b) =>
        a.numberOfInquiriesSent > b.numberOfInquiriesSent ? -1 : 1
      )
    } else if (scrollerDbEntry.mainData == "Price") {
      _classesThatFitSearch = mediaScrollerFunctions.allClasses.filter(
        _class => _class.price.priceForSearchFunction.lowRange <= scrollerDbEntry.secondaryData
      )
    } else if (scrollerDbEntry.mainData == "Experience Level") {
      _classesThatFitSearch = mediaScrollerFunctions.allClasses.filter(
        _class => _class.difficulty === scrollerDbEntry.secondaryData
      )
    } else if (scrollerDbEntry.mainData == "Age Group") {
      _classesThatFitSearch = mediaScrollerFunctions.allClasses.filter(x => {
        if (scrollerDbEntry.secondaryData == "adult") {
          return x.ageGroup.adult === true
        } else if (scrollerDbEntry.secondaryData == "child") {
          return x.ageGroup.child === true
        } else if (scrollerDbEntry.secondaryData == "mixed") {
          return x.ageGroup.mixed === true
        }
      })
    } else if (scrollerDbEntry.mainData == "Newest") {
      _classesThatFitSearch = [...mediaScrollerFunctions.allClasses]
    } else if (scrollerDbEntry.mainData == "Best Sellers") {
      _classesThatFitSearch = mediaScrollerFunctions.allClasses.filter(_class => _class.featured)
    }
    return _classesThatFitSearch
  },
  createClassDisplayFromTemplate: (data, indexes) => {
    const classDisplayClone = mediaScrollerFunctions.displayTemplate.content.cloneNode(true)
    const previewImage = classDisplayClone.querySelector(".class-preview-img")
    const classNameDisplay = classDisplayClone.querySelector(".class-name")
    const tagDisplay = classDisplayClone.querySelector(".class-preview-tag-display")
    const durationDisplay = classDisplayClone.querySelector(".class-preview-duration-display")
    const priceDisplay = classDisplayClone.querySelector(".class-preview-price-display")
    const difficultyDisplay = classDisplayClone.querySelector(".class-preview-difficulty-display")
    const displayButton = classDisplayClone.querySelector(".btn-class-view")

    previewImage.src = data.photos[0].src
    previewImage.alt = data.photos[0].alt
    tagDisplay.innerHTML = data.tags[0]
    durationDisplay.innerHTML = data.duration.string
    difficultyDisplay.innerHTML = data.difficulty
    displayButton.classList.add(mediaScrollerFunctions.cardButtonClassString)
    displayButton.dataset.categoryNumber = indexes.indexCategory
    displayButton.dataset.classNumber = indexes.indexClass
    classNameDisplay.innerHTML = data.name

    if (data.price.priceForSearchFunction.lowRange == data.price.priceForSearchFunction.highRange) {
      priceDisplay.innerHTML = `$${data.price.priceForSearchFunction.lowRange}`
    } else {
      priceDisplay.innerHTML = `$${data.price.priceForSearchFunction.lowRange} - $${data.price.priceForSearchFunction.highRange}`
    }

    return classDisplayClone
  },
  viewClassButtonFunction: e => {
    if (!e.target.classList.contains(mediaScrollerFunctions.cardButtonClassString)) return

    // console.log(mediaScrollerFunctions.classDataArray)
    // console.log(e.target.dataset.categoryNumber)
    processClassData(
      mediaScrollerFunctions.classDataArray[e.target.dataset.categoryNumber][
        e.target.dataset.classNumber
      ]
    )

    modalDisplay.holder.classList.add("modal-holder--visible")
    modalDisplay.holder.classList.remove("modal-holder--invisible")
    modalRequest.holder.classList.add("invisible")
    modalRequest.resetInputFields()
  },
}
