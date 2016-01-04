var navStandAlone = function standalone () {
if (window.navigator.standalone === true) {
return 'NAVIGATOR IS WORKING!!!'
} else {
return 'not working'
}
}
navStandAlone()
