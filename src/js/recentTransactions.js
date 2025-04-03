const transactionsContainerElement = document.querySelector("#js-transactions");
let products = [];
let userAge = null; // Declare globally

// Check if containerElement exists in the DOM
if (!transactionsContainerElement) {
    alert("Required elements are missing on this page. Please try again later.");
} else {
    setup();
}

// Initialize the application setup
async function setup() {
    await fetchUserAge();  // Ensure userAge is fetched first
    await getProducts();   // Then fetch products
    renderProducts(products);  // Now render with correct userAge
}

// Fetch user data from user.json
async function fetchUserAge() {
    try {
        const response = await fetch("userInfo.json");
        if (!response.ok) throw new Error("Failed to load user data.");

        const userData = await response.json();
        userAge = userData.age; // Store user's age globally
    } catch (error) {
        alert("Failed to load user data");
    }
}

// Fetch transactions data from transactions.json
async function getProducts() {
    try {
        const response = await fetch("transactions.json");
        if (!response.ok) throw new Error("Failed to load transactions.");

        products = await response.json();
    } catch (error) {
        alert("There was an error loading transactions-list. Please try again later.");
    }
}

// Render Products
function renderProducts(products) {
    if (!products || products.length === 0) {
        transactionsContainerElement.innerHTML = "<p>No transactions available.</p>";
        return;
    }

    clearNode(transactionsContainerElement);

    let htmlContent = ""; // Store all templates before updating DOM

    products.forEach(product => {
        htmlContent += itemTemplate({
            title: product.title,
            description: product.description,
            icon: sortIcon(product),
            amount: product.amount,
            date: product.date
        });
    });

    transactionsContainerElement.innerHTML = htmlContent; // Update the DOM once
}

// Sorting Icons by Category
function sortIcon(product) {
    if (!product || !product.category || userAge === null) return "";

    if (userAge < product.ageLimit) {
        return `
        <div class="transaction-icon restricted" style="background-color: #ee9b00;">
            <i class="fa-solid fa-circle-exclamation"></i>
        </div>`;
    }

    const iconType = {
        refreshments: "fa-burger",
        gift: "fa-gift",
        clothing: "fa-shirt",
        restricted: "fa-circle-exclamation"
    };

    return `
    <div class="transaction-icon ${product.category}"> 
        <i class="fa-solid ${iconType[product.category]}"></i>
    </div>`;
}

// Creating templates for the items
function itemTemplate({ title, description, icon, amount, date }) {
    return `
    <article class="transaction-card">
        ${icon}
        <div class="transaction-info">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        <div class="transaction-amount">
            <p class="amount-spent">${amount}</p>
            <p class="transaction-date">${date}</p>
        </div>
    </article>`;
}

// Clears previous content before rendering
function clearNode(node) {
    if (node) {
        node.innerHTML = "";
    }
}
