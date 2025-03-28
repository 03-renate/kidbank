// DOM Elements

const restrictedModal = document.getElementById("restrictedModal");
const closeModal = document.querySelector(".close-modal");
const closeBtn = document.querySelector(".close-btn");
const testButtons = document.querySelectorAll(".test-btn");
const restrictedItem = document.getElementById("restrictedItem");
const restrictionReason = document.getElementById("restrictionReason");
const sidebar = document.getElementById("sidebar");
const toggleButton = document.getElementById("toggleSidebar");

const taskCards = document.querySelectorAll(".task-card");

//Navigation

// Set initial state - expanded on desktop
if (window.innerWidth > 768) {
  sidebar.classList.remove("collapsed");
}

toggleButton.addEventListener("click", () => {
  if (window.innerWidth > 768) {
    sidebar.classList.toggle("collapsed");

    // Rotate the icon
    const icon = toggleButton.querySelector(".toggle-icon");
    icon.classList.toggle("rotated");
  }
});

// Check window size on resize
window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    // Reset desktop classes when switching to mobile
    sidebar.classList.remove("collapsed");
  }
});

// Close modal when clicking X or OK button
closeModal.addEventListener("click", () => {
  restrictedModal.style.display = "none";
});

closeBtn.addEventListener("click", () => {
  restrictedModal.style.display = "none";
});

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
  if (e.target === restrictedModal) {
    restrictedModal.style.display = "none";
  }
});

//ONLINE SHOP SECTION
// Existing JavaScript functionality

document.addEventListener("DOMContentLoaded", () => {
  const webView = document.getElementById("webView");
  const webViewContainer = document.querySelector(".webview-container");
  const storeList = document.getElementById("storeList");
  const storeInput = document.getElementById("storeInput");
  const addStoreBtn = document.getElementById("addStoreBtn");

  function openStore(url) {
    webView.src = url;
    webViewContainer.style.display = "block";
  }

  function createStoreButton(url) {
    const storeItem = document.createElement("div");
    storeItem.classList.add("store-item");

    const storeButton = document.createElement("button");
    storeButton.classList.add("store-btn");
    storeButton.dataset.url = url;
    storeButton.innerHTML = `<i class="fas fa-globe"></i> ${
      new URL(url).hostname
    }`;
    storeButton.addEventListener("click", () => openStore(url));

    // Add Remove Button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-store-btn");
    removeBtn.innerHTML = "❌";
    removeBtn.addEventListener("click", () => {
      storeItem.remove();
      saveFavorites();
    });

    storeItem.appendChild(storeButton);
    storeItem.appendChild(removeBtn);
    storeList.appendChild(storeItem);
  }

  addStoreBtn.addEventListener("click", () => {
    const url = storeInput.value.trim();
    if (!url.startsWith("http")) {
      alert("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    createStoreButton(url);
    storeInput.value = "";
    saveFavorites();
  });

  function saveFavorites() {
    const stores = Array.from(
      storeList.querySelectorAll(".store-item .store-btn")
    )
      .map((btn) => btn.dataset.url)
      .slice(4);

    localStorage.setItem("favoriteStores", JSON.stringify(stores));
  }

  function loadFavorites() {
    const savedStores = JSON.parse(
      localStorage.getItem("favoriteStores") || "[]"
    );
    savedStores.forEach((url) => createStoreButton(url));
  }

  loadFavorites();
});

// Show notification function
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <p>${message}</p>
        <span class="notification-close">&times;</span>
    `;

  // Add to body
  document.body.appendChild(notification);

  // Add styles dynamically
  notification.style.position = "fixed";
  notification.style.bottom = "80px";
  notification.style.right = "20px";
  notification.style.padding = "15px 20px";
  notification.style.borderRadius = "10px";
  notification.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
  notification.style.zIndex = "9999";
  notification.style.minWidth = "250px";
  notification.style.display = "flex";
  notification.style.justifyContent = "space-between";
  notification.style.alignItems = "center";

  if (type === "success") {
    notification.style.backgroundColor = "#2dce89";
    notification.style.color = "white";
  } else if (type === "error") {
    notification.style.backgroundColor = "#ff396f";
    notification.style.color = "white";
  } else {
    notification.style.backgroundColor = "#5e72e4";
    notification.style.color = "white";
  }

  // Add close functionality
  const closeNotification = notification.querySelector(".notification-close");
  closeNotification.style.cursor = "pointer";
  closeNotification.style.marginLeft = "10px";
  closeNotification.style.fontSize = "1.2rem";

  closeNotification.addEventListener("click", () => {
    document.body.removeChild(notification);
  });

  // Auto-remove after 3 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 3000);
}

// Update balance (simulation)
function updateBalance(amount) {
  const balanceElement = document.querySelector(".balance-amount .amount");
  const currentBalance = parseFloat(balanceElement.textContent);
  const newBalance = (currentBalance + parseFloat(amount)).toFixed(2);

  // Animate the balance change
  animateValue(balanceElement, currentBalance, newBalance, 500);
}

// Animate value change
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = progress * (end - start) + start;
    element.textContent = value.toFixed(2);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Add transaction to list (simulation)
function addTransaction(name, category, amount) {
  const transactionList = document.querySelector(".transaction-list");
  const newTransaction = document.createElement("div");
  newTransaction.className = "transaction-card";

  // Set icon based on category
  let iconClass = "fas fa-shopping-bag";
  let iconColorClass = "";

  if (category === "Food") {
    iconClass = "fas fa-utensils";
    iconColorClass = "starbucks";
  } else if (category === "Entertainment") {
    iconClass = "fas fa-film";
    iconColorClass = "spotify";
  } else if (category === "Electronics") {
    iconClass = "fas fa-laptop";
    iconColorClass = "";
  }

  // Create transaction HTML
  newTransaction.innerHTML = `
        <div class="transaction-icon ${
          iconColorClass || category.toLowerCase()
        }">
            <i class="${iconClass}"></i>
        </div>
        <div class="transaction-info">
            <h3>${name}</h3>
            <p>${category}</p>
        </div>
        <div class="transaction-amount">
            <p class="amount-spent">-$${parseFloat(amount).toFixed(2)}</p>
            <p class="transaction-date">Just now</p>
        </div>
    `;

  // Add transaction to the top of the list
  transactionList.insertBefore(newTransaction, transactionList.firstChild);

  // Highlight the new transaction
  newTransaction.style.animation = "fadeIn 0.5s";
}

// Add CSS for fade-in animation
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Handle add money button
document
  .querySelector(".action-btn.add-money")
  .addEventListener("click", () => {
    // Create a modal for adding money
    const addMoneyModal = document.createElement("div");
    addMoneyModal.className = "modal";
    addMoneyModal.style.display = "flex";

    addMoneyModal.innerHTML = `
        <div class="modal-content">
            <span class="close-add-modal">&times;</span>
            <div class="modal-icon" style="background-color: #2dce89;">
                <i class="fas fa-wallet"></i>
            </div>
            <h2>Add Money</h2>
            <p>Ask a parent or guardian to add money to your account.</p>
            <div class="amount-options">
                <button class="amount-option" data-amount="10">$10</button>
                <button class="amount-option" data-amount="20">$20</button>
                <button class="amount-option" data-amount="50">$50</button>
                <button class="amount-option" data-amount="100">$100</button>
            </div>
            <div class="custom-amount">
                <p>Or enter custom amount:</p>
                <input type="number" id="customAmount" placeholder="$0.00" min="1" max="500">
            </div>
            <button class="modal-btn add-money-btn">Request Money</button>
        </div>
    `;

    document.body.appendChild(addMoneyModal);

    // Style the modal elements
    const amountOptions = addMoneyModal.querySelectorAll(".amount-option");
    const amountOptionsContainer =
      addMoneyModal.querySelector(".amount-options");
    const customAmountContainer = addMoneyModal.querySelector(".custom-amount");
    const customAmountInput = addMoneyModal.querySelector("#customAmount");

    // Style amount options
    amountOptionsContainer.style.display = "grid";
    amountOptionsContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
    amountOptionsContainer.style.gap = "10px";
    amountOptionsContainer.style.margin = "15px 0";

    amountOptions.forEach((option) => {
      option.style.padding = "10px";
      option.style.border = "2px solid #5e72e4";
      option.style.borderRadius = "8px";
      option.style.background = "none";
      option.style.color = "#5e72e4";
      option.style.fontWeight = "500";
      option.style.cursor = "pointer";
      option.style.transition = "all 0.2s ease";

      option.addEventListener("mouseover", () => {
        option.style.backgroundColor = "#5e72e4";
        option.style.color = "white";
      });

      option.addEventListener("mouseout", () => {
        option.style.backgroundColor = "transparent";
        option.style.color = "#5e72e4";
      });

      option.addEventListener("click", () => {
        const amount = option.getAttribute("data-amount");
        customAmountInput.value = amount;
      });
    });

    // Style custom amount container
    customAmountContainer.style.margin = "15px 0";
    customAmountContainer.style.textAlign = "left";

    customAmountInput.style.width = "100%";
    customAmountInput.style.padding = "10px";
    customAmountInput.style.borderRadius = "8px";
    customAmountInput.style.border = "1px solid #ddd";
    customAmountInput.style.marginTop = "5px";

    // Close modal functionality
    const closeAddModal = addMoneyModal.querySelector(".close-add-modal");
    closeAddModal.addEventListener("click", () => {
      document.body.removeChild(addMoneyModal);
    });

    // Close when clicking outside
    addMoneyModal.addEventListener("click", (e) => {
      if (e.target === addMoneyModal) {
        document.body.removeChild(addMoneyModal);
      }
    });

    // Add money button functionality
    const addMoneyBtn = addMoneyModal.querySelector(".add-money-btn");
    addMoneyBtn.addEventListener("click", () => {
      const amount = customAmountInput.value;

      if (!amount || isNaN(amount) || amount <= 0) {
        showNotification("Please enter a valid amount", "error");
        return;
      }

      // Remove modal
      document.body.removeChild(addMoneyModal);

      // Show notification
      showNotification("Money request sent to parent!", "success");

      // Simulate parent approval after 3 seconds
      setTimeout(() => {
        showNotification("Your parent approved your request!", "success");

        // Add transaction
        const transactionList = document.querySelector(".transaction-list");
        const newTransaction = document.createElement("div");
        newTransaction.className = "transaction-card";

        newTransaction.innerHTML = `
                <div class="transaction-icon allowance">
                    <i class="fas fa-gift"></i>
                </div>
                <div class="transaction-info">
                    <h3>Money Added</h3>
                    <p>From Parent</p>
                </div>
                <div class="transaction-amount positive">
                    <p class="amount-received">+$${parseFloat(amount).toFixed(
                      2
                    )}</p>
                    <p class="transaction-date">Just now</p>
                </div>
            `;

        // Add transaction to the top of the list
        transactionList.insertBefore(
          newTransaction,
          transactionList.firstChild
        );

        // Update balance
        updateBalance(amount);
      }, 3000);
    });
  });

// Savings goal tracker functionality
document.querySelector(".add-goal").addEventListener("click", () => {
  // Create modal for adding a savings goal
  const addGoalModal = document.createElement("div");
  addGoalModal.className = "modal";
  addGoalModal.style.display = "flex";

  addGoalModal.innerHTML = `
        <div class="modal-content">
            <span class="close-goal-modal">&times;</span>
            <div class="modal-icon" style="background-color: #825ee4;">
                <i class="fas fa-piggy-bank"></i>
            </div>
            <h2>Add Savings Goal</h2>
            <form id="goalForm">
                <div class="form-group">
                    <label for="goalName">What are you saving for?</label>
                    <input type="text" id="goalName" required placeholder="e.g. New Headphones">
                </div>
                <div class="form-group">
                    <label for="goalAmount">How much do you need to save?</label>
                    <input type="number" id="goalAmount" required min="1" placeholder="$0.00">
                </div>
                <div class="form-group">
                    <label for="goalIcon">Choose an icon</label>
                    <div class="icon-options">
                        <div class="icon-option selected" data-icon="fas fa-gamepad">
                            <i class="fas fa-gamepad"></i>
                        </div>
                        <div class="icon-option" data-icon="fas fa-laptop">
                            <i class="fas fa-laptop"></i>
                        </div>
                        <div class="icon-option" data-icon="fas fa-tshirt">
                            <i class="fas fa-tshirt"></i>
                        </div>
                        <div class="icon-option" data-icon="fas fa-plane">
                            <i class="fas fa-plane"></i>
                        </div>
                        <div class="icon-option" data-icon="fas fa-headphones">
                            <i class="fas fa-headphones"></i>
                        </div>
                        <div class="icon-option" data-icon="fas fa-bicycle">
                            <i class="fas fa-bicycle"></i>
                        </div>
                    </div>
                    <input type="hidden" id="goalIcon" value="fas fa-gamepad">
                </div>
                <button type="submit" class="modal-btn">Create Goal</button>
            </form>
        </div>
    `;

  document.body.appendChild(addGoalModal);

  // Style form elements
  const form = addGoalModal.querySelector("#goalForm");
  const formGroups = addGoalModal.querySelectorAll(".form-group");
  const inputs = addGoalModal.querySelectorAll('input:not([type="hidden"])');
  const labels = addGoalModal.querySelectorAll("label");
  const iconOptions = addGoalModal.querySelectorAll(".icon-option");
  const iconOptionsContainer = addGoalModal.querySelector(".icon-options");

  // Style form groups
  formGroups.forEach((group) => {
    group.style.marginBottom = "20px";
    group.style.textAlign = "left";
  });

  // Style labels
  labels.forEach((label) => {
    label.style.display = "block";
    label.style.marginBottom = "5px";
    label.style.fontWeight = "500";
  });

  // Style inputs
  inputs.forEach((input) => {
    input.style.width = "100%";
    input.style.padding = "10px";
    input.style.borderRadius = "8px";
    input.style.border = "1px solid #ddd";
  });

  // Style icon options
  iconOptionsContainer.style.display = "grid";
  iconOptionsContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
  iconOptionsContainer.style.gap = "10px";
  iconOptionsContainer.style.marginTop = "10px";

  iconOptions.forEach((option) => {
    option.style.display = "flex";
    option.style.alignItems = "center";
    option.style.justifyContent = "center";
    option.style.width = "100%";
    option.style.height = "50px";
    option.style.backgroundColor = "#f8f9fa";
    option.style.borderRadius = "8px";
    option.style.cursor = "pointer";
    option.style.fontSize = "1.3rem";
    option.style.color = "#666";

    if (option.classList.contains("selected")) {
      option.style.backgroundColor = "#825ee4";
      option.style.color = "white";
    }

    option.addEventListener("click", () => {
      // Remove selected class from all options
      iconOptions.forEach((opt) => {
        opt.classList.remove("selected");
        opt.style.backgroundColor = "#f8f9fa";
        opt.style.color = "#666";
      });

      // Add selected class to clicked option
      option.classList.add("selected");
      option.style.backgroundColor = "#825ee4";
      option.style.color = "white";

      // Update hidden input
      document.getElementById("goalIcon").value =
        option.getAttribute("data-icon");
    });
  });

  // Close modal functionality
  const closeGoalModal = addGoalModal.querySelector(".close-goal-modal");
  closeGoalModal.addEventListener("click", () => {
    document.body.removeChild(addGoalModal);
  });

  // Close when clicking outside
  addGoalModal.addEventListener("click", (e) => {
    if (e.target === addGoalModal) {
      document.body.removeChild(addGoalModal);
    }
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const goalName = document.getElementById("goalName").value;
    const goalAmount = document.getElementById("goalAmount").value;
    const goalIcon = document.getElementById("goalIcon").value;

    if (!goalName || !goalAmount || isNaN(goalAmount) || goalAmount <= 0) {
      showNotification("Please fill out all fields correctly", "error");
      return;
    }

    // Add the new goal to the goals list
    addSavingsGoal(goalName, goalAmount, goalIcon);

    // Remove modal
    document.body.removeChild(addGoalModal);

    // Show notification
    showNotification("New savings goal created!", "success");
  });
});

// Function to add a new savings goal
function addSavingsGoal(name, targetAmount, iconClass) {
  const goalsList = document.querySelector(".goals-list");
  const newGoal = document.createElement("div");
  newGoal.className = "goal-card";

  // Start with 0 saved
  const savedAmount = 0;
  const percentage = (savedAmount / targetAmount) * 100;

  newGoal.innerHTML = `
        <div class="goal-icon">
            <i class="${iconClass}"></i>
        </div>
        <div class="goal-info">
            <h3>${name}</h3>
            <div class="progress-bar">
                <div class="progress" style="width: ${percentage}%"></div>
            </div>
            <p>$${savedAmount.toFixed(
              2
            )} <span class="of-target">of $${parseFloat(targetAmount).toFixed(
    2
  )}</span></p>
        </div>
    `;

  // Add goal to the list
  goalsList.appendChild(newGoal);

  // Add click event to the goal card to add money to it
  newGoal.addEventListener("click", () => {
    showAddToGoalModal(name, savedAmount, targetAmount, newGoal);
  });
}

// Function to show modal for adding money to a goal
function showAddToGoalModal(
  goalName,
  currentAmount,
  targetAmount,
  goalElement
) {
  const addToGoalModal = document.createElement("div");
  addToGoalModal.className = "modal";
  addToGoalModal.style.display = "flex";

  addToGoalModal.innerHTML = `
        <div class="modal-content">
            <span class="close-add-to-goal-modal">&times;</span>
            <div class="modal-icon" style="background-color: #825ee4;">
                <i class="fas fa-piggy-bank"></i>
            </div>
            <h2>Add to "${goalName}"</h2>
            <p>Current progress: $${currentAmount.toFixed(2)} of $${parseFloat(
    targetAmount
  ).toFixed(2)}</p>
            <div class="form-group">
                <label for="addAmount">How much would you like to add?</label>
                <input type="number" id="addAmount" required min="1" max="${
                  parseFloat(targetAmount) - currentAmount
                }" placeholder="$0.00">
            </div>
            <button class="modal-btn add-to-goal-btn">Add to Goal</button>
        </div>
    `;

  document.body.appendChild(addToGoalModal);

  // Style elements
  const input = addToGoalModal.querySelector("#addAmount");
  const formGroup = addToGoalModal.querySelector(".form-group");
  const label = addToGoalModal.querySelector("label");

  formGroup.style.marginBottom = "20px";
  formGroup.style.textAlign = "left";

  label.style.display = "block";
  label.style.marginBottom = "5px";
  label.style.fontWeight = "500";

  input.style.width = "100%";
  input.style.padding = "10px";
  input.style.borderRadius = "8px";
  input.style.border = "1px solid #ddd";

  // Close modal functionality
  const closeAddToGoalModal = addToGoalModal.querySelector(
    ".close-add-to-goal-modal"
  );
  closeAddToGoalModal.addEventListener("click", () => {
    document.body.removeChild(addToGoalModal);
  });

  // Close when clicking outside
  addToGoalModal.addEventListener("click", (e) => {
    if (e.target === addToGoalModal) {
      document.body.removeChild(addToGoalModal);
    }
  });

  // Add to goal button functionality
  const addToGoalBtn = addToGoalModal.querySelector(".add-to-goal-btn");
  addToGoalBtn.addEventListener("click", () => {
    const amount = parseFloat(document.getElementById("addAmount").value);

    if (
      !amount ||
      isNaN(amount) ||
      amount <= 0 ||
      amount > parseFloat(targetAmount) - currentAmount
    ) {
      showNotification("Please enter a valid amount", "error");
      return;
    }

    // Get current balance
    const balanceElement = document.querySelector(".balance-amount .amount");
    const currentBalance = parseFloat(balanceElement.textContent);

    if (amount > currentBalance) {
      showNotification("You don't have enough money in your balance", "error");
      return;
    }

    // Update the goal
    const newAmount = currentAmount + amount;
    const percentage = (newAmount / targetAmount) * 100;

    // Update the goal element
    const progressBar = goalElement.querySelector(".progress");
    const amountText = goalElement.querySelector(".goal-info p");

    progressBar.style.width = `${percentage}%`;
    amountText.innerHTML = `$${newAmount.toFixed(
      2
    )} <span class="of-target">of $${parseFloat(targetAmount).toFixed(
      2
    )}</span>`;

    // Update balance
    updateBalance(-amount);

    // Remove modal
    document.body.removeChild(addToGoalModal);

    // Show notification
    showNotification(
      `Added $${amount.toFixed(2)} to your ${goalName} goal!`,
      "success"
    );

    // Add transaction
    const transactionList = document.querySelector(".transaction-list");
    const newTransaction = document.createElement("div");
    newTransaction.className = "transaction-card";

    newTransaction.innerHTML = `
            <div class="transaction-icon" style="background-color: #825ee4;">
                <i class="fas fa-piggy-bank"></i>
            </div>
            <div class="transaction-info">
                <h3>Savings: ${goalName}</h3>
                <p>Money added to goal</p>
            </div>
            <div class="transaction-amount">
                <p class="amount-spent">-$${amount.toFixed(2)}</p>
                <p class="transaction-date">Just now</p>
            </div>
        `;

    // Add transaction to the top of the list
    transactionList.insertBefore(newTransaction, transactionList.firstChild);
  });
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  console.log("TeenFinance App initialized");

  // Simulate loading data
  setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) {
      loadingScreen.style.display = "none";
    }
  }, 1000);
});

// Footer

function showMember(name, role, github) {
  document.getElementById("memberName").innerText = name;
  document.getElementById("memberRole").innerText = role;
  document.getElementById("memberGithub").href = github;
  document.getElementById("memberGithub").innerText = `GitHub: ${github}`;
  document.getElementById("pop-up-member").style.display = "block";
}

document.querySelector("#close-btn").onclick = function () {
  document.getElementById("pop-up-member").style.display = "none";
};

window.onclick = function (event) {
  if (event.target == document.getElementById("pop-up-member")) {
    document.getElementById("pop-up-member").style.display = "none";
  }
};

// Assign Tasks

taskCards.forEach((task) => {
  task.addEventListener("click", (event) => {
    if (event.target.tagName === "INPUT") {
      event.stopPropagation();
    }
    const balanceAmountElement = document.getElementById("re_balance");
    debugger;
    let currentBalance = parseFloat(
      balanceAmountElement.textContent.replace("$", "")
    );
    const amountText = task.querySelector(".amount").textContent;
    const taskAmount = parseFloat(amountText.replace("$", ""));
    currentBalance += taskAmount;
    balanceAmountElement.textContent = `$${currentBalance.toFixed(2)}`;

    setTimeout(() => {
      task.remove();
    }, 1000);
  });
});
