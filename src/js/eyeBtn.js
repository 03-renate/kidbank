// Simulated Bank Account
let bankAccount = {
  name: "John Doe",
  balance: 5000, // Initial balance
  currency: "USD",
  currencySymbol: "$"
};


// Function to display the balance
function displayBalance() {
  const balanceElement = document.getElementById("re_balance");
  balanceElement.textContent = `${bankAccount.currencySymbol} ${bankAccount.balance.toFixed(2)}`;
}

// Initialize the balance display
document.addEventListener("DOMContentLoaded", displayBalance);
// Function to add amount to the balance
function addAmount(amount) {
if (amount > 0) {
    bankAccount.balance += amount;
    console.log(`Added ${amount}${bankAccount.symbol}. New balance: ${bankAccount.balance}${bankAccount.symbol}`);
    renderAccount();
} else {
  console.error("The amount must be greater than 0.");
}
}

// Function to subtract amount from the balance
function subtractAmount(amount) {
  if (amount > 0 && amount <= bankAccount.balance) {
    bankAccount.balance -= amount;
    console.log(`Withdrew ${amount}${bankAccount.symbol}. New balance: ${bankAccount.balance}${bankAccount.symbol}`);
    renderAccount();
} else {
    console.error("Invalid amount. Ensure the amount is positive and does not exceed the balance.");
}
}


// Function to render the bank account information on the page
function renderAccount() {
  const accountDiv = document.getElementById("accountOverview");
  accountDiv.innerHTML = 
  `<h2>Account Overview</h2>
  <p>Name: ${bankAccount.name}</p>
  <p>Balance: ${bankAccount.balance}${bankAccount.symbol} (${bankAccount.currency})</p>`;
}

// Initialize account overview on page load
document.addEventListener("DOMContentLoaded", renderAccount);
  


//eye-icon btn

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