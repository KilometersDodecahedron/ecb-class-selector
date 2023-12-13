let baseHostUrl = ""
let urlSearchParams = new URLSearchParams(window.location.search)
let classIdUrlParam = urlSearchParams.get("classid")
let hostUrlParam = urlSearchParams.get("host")

if (classIdUrlParam) {
  getAllClasses(data => {
    let classFromLink = SEARCHbyID(data, classIdUrlParam)
    if (classFromLink.length > 0) {
      openModalAndDisplay(classFromLink[0])
    }
  })
}

window.addEventListener("message", function (event) {
  baseHostUrl = event.data
  if (baseHostUrl[0] === "[") {
    baseHostUrl = "https://theeclecticchicboutique.com/select-a-craft-class/"
  }
})

window.parent.postMessage({ pageLoaded: true }, "*")
