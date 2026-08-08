// Menu page logic: search, category filtering, food cards,
// the customization modal and adding items to the cart.

let currentCategory = "All";
let selectedFood = null;
let selectedSize = "Regular";
let selectedToppings = [];
let quantity = 1;

// Build the category filter buttons.
function renderFilterButtons() {
  const row = document.getElementById("filter-row");

  CATEGORIES.forEach(function (category) {
    const button = document.createElement("button");
    button.className = "filter-btn";
    button.textContent = category;
    button.dataset.category = category;

    if (category === currentCategory) {
      button.classList.add("active");
    }

    button.addEventListener("click", function () {
      currentCategory = category;
      row.querySelectorAll(".filter-btn").forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      renderMenu();
    });

    row.appendChild(button);
  });
}

// Show the food cards that match the search text and the chosen category.
function renderMenu() {
  const grid = document.getElementById("menu-grid");
  const searchText = document.getElementById("search-input").value.toLowerCase().trim();

  const filtered = FOODS.filter(function (food) {
    const matchesCategory = currentCategory === "All" || food.category === currentCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchText) ||
                          food.description.toLowerCase().includes(searchText) ||
                          food.category.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = "";

  filtered.forEach(function (food) {
    grid.appendChild(buildFoodCard(food));
  });

  // Show or hide the "no results" message.
  const noResults = document.getElementById("no-results");
  if (filtered.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }

  document.getElementById("results-count").textContent =
    filtered.length + " item" + (filtered.length === 1 ? "" : "s");
}

// Build one food card.
function buildFoodCard(food) {
  const card = document.createElement("div");
  card.className = "food-card";

  card.innerHTML =
    '<div class="food-image">' +
      '<img src="' + food.image + '" alt="' + food.name + '">' +
      '<span class="badge-tag">' + food.category + '</span>' +
    '</div>' +
    '<div class="food-info">' +
      '<h3>' + food.name + '</h3>' +
      '<div class="food-rating">' +
        '<span class="stars">' + getStars(food.rating) + '</span>' +
        '<span class="rating-text">' + food.rating + ' (' + food.reviews + ')</span>' +
      '</div>' +
      '<p class="food-desc">' + food.description + '</p>' +
      '<div class="food-bottom">' +
        '<span class="price">$' + food.price.toFixed(2) + '</span>' +
        '<button class="btn btn-add" data-id="' + food.id + '">+ Add</button>' +
      '</div>' +
    '</div>';

  card.querySelector(".btn-add").addEventListener("click", function () {
    openModal(food);
  });

  return card;
}

// Open the customization modal for one food item.
function openModal(food) {
  selectedFood = food;
  selectedSize = "Regular";
  selectedToppings = [];
  quantity = 1;

  const modal = document.getElementById("modal");
  modal.innerHTML =
    '<div class="modal-image">' +
      '<img src="' + food.image + '" alt="' + food.name + '">' +
      '<button class="modal-close" id="modal-close">×</button>' +
    '</div>' +
    '<div class="modal-body">' +
      '<h2>' + food.name + '</h2>' +
      '<p class="modal-desc">' + food.description + '</p>' +
      '<div class="option-block">' +
        '<h3>Choose Size</h3>' +
        '<div class="size-options" id="size-options"></div>' +
      '</div>' +
      (food.toppings.length > 0
        ? '<div class="option-block">' +
            '<h3>Add Toppings</h3>' +
            '<div class="topping-options" id="topping-options"></div>' +
          '</div>'
        : "") +
      '<div class="option-block">' +
        '<h3>Quantity</h3>' +
        '<div class="qty-control">' +
          '<button id="qty-minus">−</button>' +
          '<span id="qty-display">1</span>' +
          '<button id="qty-plus">+</button>' +
        '</div>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<span class="price modal-total" id="modal-total">$' + food.price.toFixed(2) + '</span>' +
        '<button class="btn btn-primary" id="add-to-cart">Add to Cart</button>' +
      '</div>' +
    '</div>';

  buildSizeOptions(food);
  buildToppingOptions(food);

  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("qty-minus").addEventListener("click", function () {
    changeQuantityInModal(-1);
  });
  document.getElementById("qty-plus").addEventListener("click", function () {
    changeQuantityInModal(1);
  });
  document.getElementById("add-to-cart").addEventListener("click", function () {
    addToCart(selectedFood, selectedSize, selectedToppings, quantity);
    showToast(selectedFood.name + " added to cart!");
    closeModal();
  });

  // Clicking the dark background also closes the modal.
  document.getElementById("modal-overlay").classList.add("show");
  document.body.style.overflow = "hidden";
  updateModalTotal();
}

// Build the size buttons (Regular / Medium / Large).
function buildSizeOptions(food) {
  const container = document.getElementById("size-options");
  const sizes = ["Regular", "Medium", "Large"];

  sizes.forEach(function (size) {
    const button = document.createElement("button");
    button.className = "size-btn";

    let extra = "";
    if (size === "Medium") {
      extra = "+$1.50";
    } else if (size === "Large") {
      extra = "+$3.00";
    }

    button.innerHTML = '<strong>' + size + '</strong><small>' + extra + '</small>';

    if (size === selectedSize) {
      button.classList.add("active");
    }

    button.addEventListener("click", function () {
      selectedSize = size;
      container.querySelectorAll(".size-btn").forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      updateModalTotal();
    });

    container.appendChild(button);
  });
}

// Build the topping checkboxes.
function buildToppingOptions(food) {
  const container = document.getElementById("topping-options");

  food.toppings.forEach(function (topping) {
    const label = document.createElement("label");
    label.className = "topping-option";

    label.innerHTML =
      '<input type="checkbox" value="' + topping.name + '">' +
      '<span>' + topping.name + ' <small>+$' + topping.price.toFixed(2) + '</small></span>';

    label.querySelector("input").addEventListener("change", function (event) {
      if (event.target.checked) {
        selectedToppings.push(topping.name);
      } else {
        selectedToppings = selectedToppings.filter(function (name) {
          return name !== topping.name;
        });
      }
      updateModalTotal();
    });

    container.appendChild(label);
  });
}

// Increase or decrease the quantity inside the modal.
function changeQuantityInModal(change) {
  quantity = quantity + change;
  if (quantity < 1) {
    quantity = 1;
  }
  document.getElementById("qty-display").textContent = quantity;
  updateModalTotal();
}

// Update the total price shown in the modal.
function updateModalTotal() {
  const unitPrice = calculateItemPrice(selectedFood, selectedSize, selectedToppings);
  const total = Math.round(unitPrice * quantity * 100) / 100;
  document.getElementById("modal-total").textContent = "$" + total.toFixed(2);
}

// Close the customization modal.
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("show");
  document.body.style.overflow = "";
}

// Show a small popup message.
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

// Turn a rating number into star icons.
function starIcon(opacity) {
  return '<svg class="star" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" opacity="' + opacity + '" aria-hidden="true"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
}

function getStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars = stars + starIcon(1);      // full star
    } else if (rating >= i - 0.5) {
      stars = stars + starIcon(0.5);    // half star
    } else {
      stars = stars + starIcon(0.15);   // empty star
    }
  }
  return stars;
}

// Start the page.
window.addEventListener("load", function () {
  renderFilterButtons();
  updateCartBadge();

  // If the user clicked "Add" on the home page, open that dish.
  const openId = localStorage.getItem("openFood");
  if (openId) {
    localStorage.removeItem("openFood");
    const food = getFoodById(Number(openId));
    if (food) {
      openModal(food);
    }
  }

  // If the user clicked a category on the home page, select it.
  const savedFilter = localStorage.getItem("foodFilter");
  if (savedFilter) {
    localStorage.removeItem("foodFilter");
    currentCategory = savedFilter;
  }

  renderMenu();

  // When the saved category was chosen, make its button active.
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(function (button) {
    if (button.dataset.category === currentCategory) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
});

// Search as the user types.
document.getElementById("search-input").addEventListener("input", function () {
  renderMenu();
});
