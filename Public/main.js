var navStandAlone = function standalone () {
  if (window.navigator.standalone) {
// return 'NAVIGATOR IS WORKING!!!'
    document.querySelector('body').textcontent = 'SHIT'
  } else {
    document.querySelector('body').textcontent = 'NOT SHIT'
// return 'not working'
  }
}
navStandAlone()
