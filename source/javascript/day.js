var today = new Date();
var day = today.getDay();
var weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

var el = document.getElementById("currentDa"); //wrong id to test sourcemaps
el.textContent = weekdays[day] + "!!!";