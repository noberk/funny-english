let button = document.getElementById("btn");
console.log(button);
function printValue(e) {
  console.log("printValue");
}
function printnAME(e) {
  console.log("printnAME");
}
function printnA2E(e) {
  console.log("printnA2E");
}

// button.onclick = printValue;
// button.click();
button.addEventListener("click", printValue);
button.addEventListener("click", printnAME);
button.addEventListener("click", printnA2E);
button.onclick = function (e) {
  console.log(e);
};

// button.removeEventListener("click", printValue);
