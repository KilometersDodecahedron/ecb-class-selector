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
