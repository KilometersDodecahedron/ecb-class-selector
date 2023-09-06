// sort (in both directions)
const privateMasterSortFunction = (_classArray, _ascending, parameterArray) => {
  let results = _classArray
  let _direction = _ascending ? 1 : -1

  // for depth
  if (parameterArray.length === 1) {
    results.sort((a, b) =>
      a[parameterArray[0]] > b[parameterArray[0]] ? 1 * _direction : -1 * _direction
    )
  } else if (parameterArray.length === 2) {
    results.sort((a, b) =>
      a[parameterArray[0]][parameterArray[1]] > b[parameterArray[0]][parameterArray[1]]
        ? 1 * _direction
        : -1 * _direction
    )
  } else if (parameterArray.length === 3) {
    results.sort((a, b) =>
      a[parameterArray[0]][parameterArray[1]][parameterArray[2]] >
      b[parameterArray[0]][parameterArray[1]][[parameterArray[2]]]
        ? 1 * _direction
        : -1 * _direction
    )
  }
  return results
}
// most recent
function SORTbyRecent(_classArray, _ascending) {
  return privateMasterSortFunction(_classArray, !_ascending, ["dateLastUpdated"])
}
// alphabetically
function SORTbyName(_classArray, _ascending) {
  return privateMasterSortFunction(_classArray, _ascending, ["name"])
}
// by price
function SORTbyPrice(_classArray, _ascending) {
  let rangeType = _ascending ? "lowRange" : "highRange"
  return privateMasterSortFunction(_classArray, _ascending, [
    "price",
    "priceForSearchFunction",
    rangeType,
  ])
}
// by duration
function SORTbyDuration(_classArray, _ascending) {
  return privateMasterSortFunction(_classArray, _ascending, ["duration", "num"])
}

// search
// by name
function SEARCHbyString(_classArray, _searchParameters) {
  _searchParameters = _searchParameters.toLowerCase()
  let results = _classArray
  resultsName = results.filter(_entry => {
    return _entry.name.toLowerCase().includes(_searchParameters)
  })
  resultsDescription = results.filter(_entry => {
    return _entry.description.toLowerCase().includes(_searchParameters)
  })
  results = [...resultsName, ...resultsDescription]
  // removes duplicates
  results = [...new Set(results)]
  return results
}

function SEARCHbyID(_classArray, _id) {
  let results = _classArray
  results = results.filter(_entry => {
    return _entry._id == _id
  })
  return results
}

function SEARCHbyKey(_classArray, _key, _value) {
  let results = _classArray
  if (_key == "tags") {
    results = results.filter(_entry => {
      return _entry[_key].includes(_value)
    })
  } else {
    results = results.filter(_entry => {
      return _entry[_key] == _value
    })
  }
  return results
}

function SEARCHageGroup(_classArray, _age) {
  let results = _classArray
  results = results.filter(_entry => {
    if (_age == "Baby and Me") {
      return _entry.ageGroup.babyAndMe == true
    } else return _entry.ageGroup[_age] == true
  })
  return results
}
// by category
// by price range
// by availability
// by age group
// by difficulty
