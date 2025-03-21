/*This function allow the user to blur out the total sum. 
When clicking the button, it will toggle the blur effect on the #blurred-currency div.
The icon inside the button will switch between fa-eye and fa-eye-slash, 
indicating the visibility state.*/

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