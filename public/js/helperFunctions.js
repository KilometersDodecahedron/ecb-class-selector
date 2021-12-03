function removeAllChildNodes(parent) {
  if (parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }
  } else {
    console.warn("No child nodes found to remove")
  }
}

function clearArray(array) {
  while (array.length) {
    array.pop()
  }
}

function goToTopOfPage() {
  window.scroll({
    top: 0,
    left: 0,
    // behavior: "smooth",
  })
}
