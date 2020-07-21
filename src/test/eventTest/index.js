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
//fill array with 60000 elements

const makeNuclearButton = () => {
  let timeWithoutDestruction = 0;
  const totalPeaceTime = () => timeWithoutDestruction;
  const timer = () => timeWithoutDestruction++;
  const launch = () => {
    timeWithoutDestruction = -1;
    console.log("爆炸");
  };
  setInterval(timer, 1000);
  return {
    totalPeaceTime,
    launch,
  };
};

const nuclear = makeNuclearButton();
nuclear.totalPeaceTime;
Date.prototype.lastYear = function () {};

let x = new Date("1900-10-10");
x;
