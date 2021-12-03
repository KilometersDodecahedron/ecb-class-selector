// the functions of the API have to load before they can be accessed
// gapi.load("client", initClient)

function processJSONIntoClassData(data) {
  const classArray = []
  for (let i = 1; i < data.length; i++) {
    let newClassEntry = new ClassTemplate(
      data[i].c[0].v,
      data[i].c[1].v,
      JSON.parse(data[i].c[2].v),
      data[i].c[3].v,
      JSON.parse(data[i].c[4].v),
      JSON.parse(data[i].c[5].v),
      JSON.parse(data[i].c[6].v),
      JSON.parse(data[i].c[7].v),
      JSON.parse(data[i].c[8].v),
      JSON.parse(data[i].c[9].v),
      JSON.parse(data[i].c[10].v),
      JSON.parse(data[i].c[11].v)
    )

    classArray.push(newClassEntry)
  }

  console.log(classArray)
  return classArray
}

getData()

// console.log(testJSON)
// console.log(JSON.parse(testJSON))
// console.log(
//   Math.random().toString(36).slice(2) +
//     Math.random().toString(36).slice(2) +
//     Math.random().toString(36).slice(2)
// )
