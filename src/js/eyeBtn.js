let currencyDiv = document.getElementById("blurred-currency");
let isBlurred = false;

function hideShow() {
  if (isBlurred) {
    currencyDiv.style.filter = "none";
  } else {
    currencyDiv.style.filter = "blur(1.5rem)";
  }
  isBlurred = !isBlurred;
}
