//Renate - Hero; eye-icon-btn
let currencyDiv = document.getElementById("blurred-currency");
let isBlurred = false;
let icon = document.querySelector(".card-icon i");

function hideShow() {
  if (isBlurred) {
    currencyDiv.style.filter = "none";
    switchIcon();
  } else {
    currencyDiv.style.filter = "blur(1.5rem)";
    switchIcon();
  }
  isBlurred = !isBlurred;
}

function switchIcon() {
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}