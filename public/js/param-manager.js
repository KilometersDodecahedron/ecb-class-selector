const paramManager = {
  baseClassNames: {
    dropdownNavLink: "dropdown-nav-linking--",
  },
  getParametersFunction: paramName => {
    let parameters = new URLSearchParams(window.location.search)
    return parameters.get(paramName)
  },
  urlWithParamConstructorFunction: (keyArray, valueArray) => {
    const baseRoute = window.location.href.split("/?")[0]

    let constructedRoute = baseRoute + "?"
    if (keyArray) {
      for (let i = 0; i < keyArray.length; i++) {
        constructedRoute += `${keyArray[i]}=${valueArray[i]}&`
      }
      constructedRoute = constructedRoute.slice(0, -1)
    }

    return constructedRoute
  },
}

const keyParam = paramManager.getParametersFunction("key")
// console.log(keyParam)

// query type: category, tags, age group, availability, skill level
// query key: ................
// display type: full, multi, home
