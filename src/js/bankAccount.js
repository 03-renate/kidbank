/* ChatGPT/RENATE
This code loads a user's information from a file, then displays it on a webpage. 
It updates the page to show the user's name and balance.
*/

let bankAccount = {}; // Initialize as an empty object to store the data from JSON

// Assuming 'containerElement' refers to a valid element
const containerElement = document.getElementById("username"); // Example for checking if the element exists

// Check if containerElement exists in the DOM
if (!containerElement) {
  alert("Required elements are missing on this page. Please try again later.");
} else {
  setup();
}

// Initialize the application setup
function setup() {
  getInfo();
}

// Fetches and displays information from userInfo
async function getInfo() {
  try {
    const response = await fetch("userInfo.json");
    if (!response.ok) {
      throw new Error("There was an error loading user data.");
    }

    bankAccount = await response.json(); // Assigning the fetched JSON to bankAccount object
    renderAccount(); // Render account data after it has been loaded
  } catch (error) {
    alert("There was an error loading user data. Please try again later.");
    console.error("Fetch Error:", error.message);
  }
}

// Function to generate/display the account information
function renderAccount() {
  displayUsername();
  displayBalance();
}

// Function to display the username
function displayUsername() {
  const nameElement = document.getElementById("username");
  if (nameElement) {
    nameElement.textContent = `${bankAccount.name}`; // Displays name from bankAccount
  }
}

// Function to display the balance
function displayBalance() {
  const balanceElement = document.getElementById("re_balance");
  if (balanceElement) {
    balanceElement.textContent = `${bankAccount.currencySymbol} ${bankAccount.balance.toFixed(2)}`; // Displays balance with currency symbol
  }
}
