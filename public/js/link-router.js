let baseHostUrl = document.referrer
let urlSearchParams = new URLSearchParams(window.location.search)
let classIdUrlParam = urlSearchParams.get("classid")
let hostUrlParam = urlSearchParams.get("host")

console.log("host", hostUrlParam)
console.log("class", classIdUrlParam)

if (classIdUrlParam) {
  getAllClasses(data => {
    let classFromLink = SEARCHbyID(data, classIdUrlParam)
    if (classFromLink.length > 0) {
      openModalAndDisplay(classFromLink[0])
    }
  })
}

// if (hostUrlParam) {
//   $.ajax({ type: "GET", url: `/api/host_routing/${hostUrlParam}`, context: this })
//     .then(data => {
//       baseHostUrl = data
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }

// console.log(document.referrer)
