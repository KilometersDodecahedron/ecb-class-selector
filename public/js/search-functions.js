const searchFunctions = {
  sort: {
    startFunction: () => {
      searchFunctions.sort.enableButtonFunctions()
    },
    enableButtonFunctions: () => {
      document.body.addEventListener("click", e => {
        if (e.target.classList.contains("dropdown-nav-sort--type-button")) {
          searchFunctions.sort.sortButtonFunction(e)
        }
      })
      document.body.addEventListener("click", e => {
        if (e.target.classList.contains("search-bar-dropdown--suggestion")) {
          e.preventDefault()
          searchFunctions.search.suggestionDropdownFunction(e)
        }
      })
    },
    highlightSortOrder: sortOrder => {
      let sortButtons = document.querySelectorAll(".dropdown-nav-sort--type-button")
      sortButtons.forEach(button => {
        button.classList.remove("dropdown-nav-sort--type-button-current")
      })

      switch (sortOrder) {
        case "newest":
          target = document.querySelector("#dropdown-nav-sort--type-button--newest")
          target.classList.add("dropdown-nav-sort--type-button-current")
          break
        case '"newest"':
          target = document.querySelector("#dropdown-nav-sort--type-button--newest")
          target.classList.add("dropdown-nav-sort--type-button-current")
          break
        case "name":
          target = document.querySelector("#dropdown-nav-sort--type-button--name")
          target.classList.add("dropdown-nav-sort--type-button-current")
          break
        case '"name"':
          target = document.querySelector("#dropdown-nav-sort--type-button--name")
          target.classList.add("dropdown-nav-sort--type-button-current")
          break
        case "duration":
          target = document.querySelector("#dropdown-nav-sort--type-button--duration")
          target.classList.add("dropdown-nav-sort--type-button-current")
          break
        case '"duration"':
          target = document.querySelector("#dropdown-nav-sort--type-button--duration")
          target.classList.add("dropdown-nav-sort--type-button-current")
          break
        case "price":
          target = document.querySelector("#dropdown-nav-sort--type-button--price")
          target.classList.add("dropdown-nav-sort--type-button-current")
          break
        case '"price"':
          target = document.querySelector("#dropdown-nav-sort--type-button--price")
          target.classList.add("dropdown-nav-sort--type-button-current")
          break
        default:
          target = document.querySelector("#dropdown-nav-sort--type-button--newest")
          target.classList.add("dropdown-nav-sort--type-button-current")
          break
      }
    },
    sortButtonFunction: e => {
      localStorage.setItem("sortOrder", JSON.stringify(e.target.dataset.sort))
      sortThenDisplay(e.target.dataset.sort)
    },
  },
  search: {
    data: {
      categoryArray: [
        // TODO set programatically
      ],
      tagArray: [
        // TODO set programatically
      ],
      ageGroupArray: ["adult", "child", "teen", "Baby and Me", "mixed"],
      skillLevelArray: ["Beginner", "Intermediate", "Advanced"],
    },
    titleDisplay: {
      key: document.querySelector("#key-display"),
      value: document.querySelector("#value-display"),
    },
    itemTemplate: document.querySelector("#dropdownNavItemTemplate"),
    suggestionTemplate: document.querySelector("#searchBarSuggestionTemplate"),
    suggestionHolder: document.querySelector("#search-bar-dropdown--suggestion--holder"),
    searchBar: document.querySelector("#dropdown-nav--search-bar"),
    homeButton: document.querySelector(".dropdown-nav-linking--home"),
    startSearchButton: document.querySelector("#dropdown-nav-linking--start-search-button"),
    categoriesButton: document
      .querySelector(".dropdown-nav-linking--categories")
      .querySelector("a"),
    categoriesDropdown: document
      .querySelector(".dropdown-nav-linking--categories")
      .querySelector("ul"),
    tagsButton: document.querySelector(".dropdown-nav-linking--tags").querySelector("a"),
    tagsDropdown: document.querySelector(".dropdown-nav-linking--tags").querySelector("ul"),
    ageGroupButton: document.querySelector(".dropdown-nav-linking--age-group").querySelector("a"),
    ageGroupDropdown: document
      .querySelector(".dropdown-nav-linking--age-group")
      .querySelector("ul"),
    skillLevelButton: document
      .querySelector(".dropdown-nav-linking--skill-level")
      .querySelector("a"),
    skillLevelDropdown: document
      .querySelector(".dropdown-nav-linking--skill-level")
      .querySelector("ul"),
    populateDropdown: (target, key, array, isEmbeddedBool) => {
      target.innerHTML = ""
      // TODO add functionality to these
      array.forEach(value => {
        _newItem = searchFunctions.search.itemTemplate.content.cloneNode(true)
        _archorTarget = _newItem.querySelector("a")
        _archorTarget.href = paramManager.urlWithParamConstructorFunction(
          ["key", "value", "isEmbeddedBool"],
          [key, value, isEmbeddedBool]
        )
        // _archorTarget.dataset.queryKey = key
        // _archorTarget.dataset.queryValue = value
        // This value was originally called "mixed"
        let checkForNameChange = HELPER_capitalizeFirstLetter(value)
        // if (checkForNameChange == "Mixed" || checkForNameChange == `"Mixed"`) {
        //   checkForNameChange = "Baby & Me"
        // }
        _archorTarget.innerHTML = checkForNameChange
        target.appendChild(_newItem)
      })
    },
    displayKeySearchInTitle: (key, value) => {
      switch (key) {
        case "category":
          searchFunctions.search.titleDisplay.value.innerHTML = HELPER_capitalizeFirstLetter(value)
          searchFunctions.search.titleDisplay.key.innerHTML = `Category: `
          break
        case "tags":
          searchFunctions.search.titleDisplay.value.innerHTML = HELPER_capitalizeFirstLetter(value)
          searchFunctions.search.titleDisplay.key.innerHTML = `Tag: `
          break
        case "ageGroup":
          searchFunctions.search.titleDisplay.value.innerHTML = HELPER_capitalizeFirstLetter(value)
          searchFunctions.search.titleDisplay.key.innerHTML = `Age Group: `
          // if (HELPER_capitalizeFirstLetter(value)) {
          //   searchFunctions.search.titleDisplay.value.innerHTML = "Baby & Me"
          // }
          break
        case "difficulty":
          searchFunctions.search.titleDisplay.value.innerHTML = HELPER_capitalizeFirstLetter(value)
          searchFunctions.search.titleDisplay.key.innerHTML = `Skill Level: `
          break
        case "searchTerm":
          searchFunctions.search.titleDisplay.value.innerHTML = value
          searchFunctions.search.titleDisplay.key.innerHTML = `Searching For: `
          break
        default:
          return
      }
    },
    dropdownLinkButtonFunction: e => {
      // console.log(e.target)
    },
    searchBarFunction: e => {
      e.preventDefault()
      let searchTerm = e.target.querySelector("input").value
      if (searchTerm != "")
        location.replace(
          paramManager.urlWithParamConstructorFunction(["key", "value"], ["searchTerm", searchTerm])
        )
    },
    suggestionDropdownFunction: e => {
      e.preventDefault()
      let searchTerm = e.target.dataset.suggestion
      let classID = e.target.dataset.classID
      if (searchTerm != "")
        location.replace(
          paramManager.urlWithParamConstructorFunction(
            ["key", "value", "classid"],
            ["searchTerm", searchTerm, classID]
          )
        )
    },
    createSuggestionsFunction: _string => {
      // console.log(allClasses)
      searchFunctions.search.suggestionHolder.innerHTML = ""
      const maxSuggestions = 5
      _string.replace(/[^a-zA-Z ]/g, "")
      let suggestionArray = []
      let trackUsedIndex = []
      // whole name
      for (let i = 0; i < allClasses.length; i++) {
        if (suggestionArray.length >= 5) {
          break
        }
        if (allClasses[i].name.toLowerCase().includes(_string.toLowerCase())) {
          suggestionArray.push(allClasses[i])
          trackUsedIndex.push(i)
        }
      }
      // name fragments
      if (suggestionArray.length < maxSuggestions) {
        let wordArray = _string.split(" ")
        // only run if there's more than 1 word
        if (wordArray.length > 0) {
          for (let i = 0; i < allClasses.length; i++) {
            if (suggestionArray.length >= maxSuggestions) {
              break
            }

            let wordMatchedTracker = 0
            for (let w = 0; w < wordArray.length; w++) {
              if (trackUsedIndex.includes(i)) {
                continue
              }
              if (allClasses[i].name.toLowerCase().includes(wordArray[w].toLowerCase())) {
                wordMatchedTracker++
                if (wordMatchedTracker === wordArray.length) {
                  suggestionArray.push(allClasses[i])
                  trackUsedIndex.push(i)
                }
              }
            }
          }
        }
      }
      // check class descriptions
      if (suggestionArray.length < maxSuggestions) {
        for (let i = 0; i < allClasses.length; i++) {
          if (suggestionArray.length >= maxSuggestions) {
            break
          }
          if (trackUsedIndex.includes(i)) {
            continue
          }
          if (allClasses[i].description.toLowerCase().includes(_string.toLowerCase())) {
            suggestionArray.push(allClasses[i])
            trackUsedIndex.push(i)
          }
        }
      }
      // check class descriptions fragments
      if (suggestionArray.length < maxSuggestions) {
        let wordArray = _string.split(" ")
        // only run if there's more than 1 word
        if (wordArray.length > 0) {
          for (let i = 0; i < allClasses.length; i++) {
            if (suggestionArray.length >= maxSuggestions) {
              break
            }

            let wordMatchedTracker = 0
            for (let w = 0; w < wordArray.length; w++) {
              if (allClasses[i].description.toLowerCase().includes(wordArray[w].toLowerCase())) {
                wordMatchedTracker++
                if (wordMatchedTracker === wordArray.length && !trackUsedIndex.includes(i)) {
                  suggestionArray.push(allClasses[i])
                  trackUsedIndex.push(i)
                }
              }
            }
          }
        }
      }
      // check spelling
      if (suggestionArray.length < maxSuggestions) {
        //
        let wordArray = _string.split(" ")
        sendWordArrayToDictionary(wordArray, data => {
          let responseWordArray = data.responseWordArray

          // this will be sorted using the helper function
          let raw2DArray = []
          responseWordArray.forEach((value, index) => {
            if (value.spelling == false && value.suggestions.length > 0) {
              let suggestions = responseWordArray[index].suggestions
              if (suggestions.length > 5) {
                suggestions = suggestions.slice(0, 5)
              }
              raw2DArray.push(suggestions)
            } else if (value.spelling == true) {
              raw2DArray.push([wordArray[index]])
            }
          })
          let possibleCorrectSpellingCombos = HELPER_getAll2DArrayCombinations(raw2DArray)
          if (possibleCorrectSpellingCombos.length > 400) {
            possibleCorrectSpellingCombos = possibleCorrectSpellingCombos.slice(0, 400)
          }
          // now check all the spellings against the options
          // starting with the title
          if (suggestionArray.length < maxSuggestions) {
            for (let i = 0; i < allClasses.length; i++) {
              if (suggestionArray.length >= maxSuggestions) {
                break
              }
              // TODO account for this being a 2D array, and add a second layer of "if" statement
              for (let i2 = 0; i2 < possibleCorrectSpellingCombos.length; i2++) {
                if (suggestionArray.length >= maxSuggestions) {
                  break
                }
                let wordMatchedTracker = 0
                let currentWordArray = possibleCorrectSpellingCombos[i2]
                for (let w = 0; w < currentWordArray.length; w++) {
                  if (suggestionArray.length >= maxSuggestions) {
                    break
                  }
                  if (trackUsedIndex.includes(i)) {
                    continue
                  }
                  if (
                    allClasses[i].name.toLowerCase().includes(currentWordArray[w].toLowerCase())
                  ) {
                    wordMatchedTracker++
                    if (wordMatchedTracker === currentWordArray.length) {
                      suggestionArray.push(allClasses[i])
                      trackUsedIndex.push(i)
                    }
                  }
                }
              }
            }
          }
          // followed by descriptions
          if (suggestionArray.length < maxSuggestions) {
            for (let i = 0; i < allClasses.length; i++) {
              if (suggestionArray.length >= maxSuggestions) {
                break
              }
              // TODO account for this being a 2D array, and add a second layer of "if" statement
              for (let i2 = 0; i2 < possibleCorrectSpellingCombos.length; i2++) {
                if (suggestionArray.length >= maxSuggestions) {
                  break
                }
                let wordMatchedTracker = 0
                let currentWordArray = possibleCorrectSpellingCombos[i2]
                for (let w = 0; w < currentWordArray.length; w++) {
                  if (suggestionArray.length >= maxSuggestions) {
                    break
                  }
                  if (trackUsedIndex.includes(i)) {
                    continue
                  }
                  if (
                    allClasses[i].description
                      .toLowerCase()
                      .includes(currentWordArray[w].toLowerCase())
                  ) {
                    wordMatchedTracker++
                    if (wordMatchedTracker === currentWordArray.length) {
                      suggestionArray.push(allClasses[i])
                      trackUsedIndex.push(i)
                    }
                  }
                }
              }
            }
          }
          if (suggestionArray.length > 0) {
            // populate results
            searchFunctions.search.suggestionHolder.innerHTML = ""
            suggestionArray.forEach((item, index) => {
              let suggestionItem = searchFunctions.search.suggestionTemplate.content.cloneNode(true)
              let editableItem = suggestionItem.querySelector("a")
              // console.log(editableItem)
              if (index == 0) {
                editableItem.classList.add("search-bar-dropdown--suggestion--top")
              }
              if (index == suggestionArray.length - 1) {
                editableItem.classList.add("search-bar-dropdown--suggestion--bottom")
              }
              editableItem.dataset.suggestion = item.name
              editableItem.dataset.classID = item._id
              editableItem.innerHTML = item.name

              searchFunctions.search.suggestionHolder.append(suggestionItem)
            })
          }
        })
      } else if (suggestionArray.length > 0) {
        searchFunctions.search.suggestionHolder.innerHTML = ""
        suggestionArray.forEach((item, index) => {
          let suggestionItem = searchFunctions.search.suggestionTemplate.content.cloneNode(true)
          let editableItem = suggestionItem.querySelector("a")
          // console.log(editableItem)
          if (index == 0) {
            editableItem.classList.add("search-bar-dropdown--suggestion--top")
          }
          if (index == suggestionArray.length - 1) {
            editableItem.classList.add("search-bar-dropdown--suggestion--bottom")
          }
          editableItem.dataset.suggestion = item.name
          editableItem.innerHTML = item.name

          searchFunctions.search.suggestionHolder.append(suggestionItem)
        })
      }
      // check class names after spellcheck
      // check class descriptions after spellcheck
      //
      // console.log(suggestionArray)
      // add items to array
    },
    suggestionFocusFunction: e => {
      let _searchData = searchFunctions.search.searchBar.querySelector("input").value
      if (_searchData.length > 2) {
        searchFunctions.search.suggestionHolder.classList.remove("invisible")
        searchFunctions.search.createSuggestionsFunction(_searchData)
      } else {
        searchFunctions.search.suggestionHolder.classList.add("invisible")
      }
      // console.log(allClasses)
    },
    suggestionFocusOutFunction: e => {
      if (
        e.target.classList.contains("search-bar-dropdown--suggestion") ||
        e.target.classList.contains("search-bar--input")
      ) {
        return
      }
      searchFunctions.search.suggestionHolder.classList.add("invisible")
    },
    startSearchButtonFunction: e => {
      location.replace(paramManager.urlWithParamConstructorFunction())
    },
    homeButtonFunction: e => {
      location.replace(paramManager.urlWithParamConstructorFunction(["isHomePage"], ["true"]))
    },
    enableButtonFunctions: () => {
      document.body.addEventListener("click", e => {
        if (e.target.classList.contains("dropdown-search--link")) {
          searchFunctions.search.dropdownLinkButtonFunction(e)
        }
      })
      searchFunctions.search.searchBar.addEventListener(
        "submit",
        searchFunctions.search.searchBarFunction
      )
      searchFunctions.search.startSearchButton.addEventListener(
        "click",
        searchFunctions.search.startSearchButtonFunction
      )
      searchFunctions.search.homeButton.addEventListener(
        "click",
        searchFunctions.search.homeButtonFunction
      )
      searchFunctions.search.searchBar.addEventListener(
        "focusin",
        searchFunctions.search.suggestionFocusFunction
      )
      searchFunctions.search.searchBar.addEventListener(
        "input",
        searchFunctions.search.suggestionFocusFunction
      )
      document.body.addEventListener("click", searchFunctions.search.suggestionFocusOutFunction)
    },
    startFunction: () => {
      getAllCategories(data => {
        data.forEach(item => {
          searchFunctions.search.data.categoryArray.push(item.name)
          searchFunctions.search.populateDropdown(
            searchFunctions.search.categoriesDropdown,
            "category",
            searchFunctions.search.data.categoryArray,
            false
          )
        })
        // console.log(searchFunctions.search.data.categoryArray)
      })
      getAllTags(data => {
        data.forEach(item => {
          searchFunctions.search.data.tagArray.push(item.name)
          searchFunctions.search.populateDropdown(
            searchFunctions.search.tagsDropdown,
            "tags",
            searchFunctions.search.data.tagArray,
            false
          )
        })
        // console.log(searchFunctions.search.data.tagArray)
      })
      searchFunctions.search.populateDropdown(
        searchFunctions.search.ageGroupDropdown,
        "ageGroup",
        searchFunctions.search.data.ageGroupArray,
        true
      )
      searchFunctions.search.populateDropdown(
        searchFunctions.search.skillLevelDropdown,
        "difficulty",
        searchFunctions.search.data.skillLevelArray,
        false
      )
      searchFunctions.search.enableButtonFunctions()
    },
  },
}

searchFunctions.search.startFunction()
searchFunctions.sort.startFunction()

// console.log(searchFunctions)
