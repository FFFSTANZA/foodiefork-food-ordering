// Checkout page logic: show the cart, calculate the bill,
// validate the customer form and confirm the order.

// Draw every cart item as a row in the order summary.
function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");

  container.innerHTML = "";

  cart.forEach(function (item) {
    const row = document.createElement("div");
    row.className = "cart-item";

    row.innerHTML =
      '<img src="' + item.image + '" alt="' + item.name + '">' +
      '<div class="cart-item-info">' +
        '<h3>' + item.name + '</h3>' +
        '<p class="cart-item-meta">' + item.size + '</p>' +
        '<p class="cart-item-meta">' + (item.toppings.length > 0 ? item.toppings.join(", ") : "No extras") + '</p>' +
        '<p class="cart-item-price">$' + item.unitPrice.toFixed(2) + ' each</p>' +
      '</div>' +
      '<div class="cart-item-actions">' +
        '<div class="qty-control small">' +
          '<button class="qty-btn" data-key="' + item.customKey + '" data-change="-1">−</button>' +
          '<span>' + item.quantity + '</span>' +
          '<button class="qty-btn" data-key="' + item.customKey + '" data-change="1">+</button>' +
        '</div>' +
        '<p class="cart-item-line-total">$' + (item.unitPrice * item.quantity).toFixed(2) + '</p>' +
        '<button class="remove-btn" data-key="' + item.customKey + '">Remove</button>' +
      '</div>';

    container.appendChild(row);
  });

  // Quantity buttons
  container.querySelectorAll(".qty-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      changeQuantity(button.dataset.key, Number(button.dataset.change));
      renderCart();
    });
  });

  // Remove buttons
  container.querySelectorAll(".remove-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      removeFromCart(button.dataset.key);
      renderCart();
    });
  });

  updateBill();
}

// Calculate subtotal, tax, delivery charge and total.
function calculateBill() {
  const cart = getCart();

  let subtotal = 0;
  cart.forEach(function (item) {
    subtotal = subtotal + item.unitPrice * item.quantity;
  });
  subtotal = Math.round(subtotal * 100) / 100;

  let delivery = DELIVERY_CHARGE;
  if (subtotal === 0 || subtotal >= FREE_DELIVERY_MIN) {
    delivery = 0;
  }

  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax + delivery) * 100) / 100;

  return {
    subtotal: subtotal,
    delivery: delivery,
    tax: tax,
    total: total
  };
}

// Show the bill breakdown in the order summary box.
function updateBill() {
  const cart = getCart();
  const bill = calculateBill();

  document.getElementById("bill-box").innerHTML =
    '<div class="bill-row"><span>Subtotal</span><span>$' + bill.subtotal.toFixed(2) + '</span></div>' +
    '<div class="bill-row"><span>Tax (5%)</span><span>$' + bill.tax.toFixed(2) + '</span></div>' +
    '<div class="bill-row">' +
      '<span>Delivery</span>' +
      '<span>' + (bill.delivery === 0 ? '<strong class="free">FREE</strong>' : "$" + bill.delivery.toFixed(2)) + '</span>' +
    '</div>' +
    (cart.length === 0 ? "" :
      '<p class="delivery-hint">' +
        (bill.delivery === 0
          ? "You unlocked free delivery!"
          : "Spend $" + (FREE_DELIVERY_MIN - bill.subtotal).toFixed(2) + " more for free delivery") +
      '</p>') +
    '<div class="bill-row total"><span>Total</span><span>$' + bill.total.toFixed(2) + '</span></div>';

  return bill;
}

// Show or hide the empty-cart message.
function toggleSections() {
  const hasItems = getCart().length > 0;
  document.getElementById("empty-cart").style.display = hasItems ? "none" : "block";
  document.getElementById("checkout-section").style.display = hasItems ? "block" : "none";
}

// Show an error message under an input field.
function showError(input, message) {
  input.classList.add("input-error");
  document.getElementById(input.id + "-error").textContent = message;
  return false;
}

// Clear the error styling for one input.
function clearError(input) {
  input.classList.remove("input-error");
  document.getElementById(input.id + "-error").textContent = "";
}

// Validate the whole customer form. Returns true if everything is ok.
function validateForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");

  let valid = true;

  // Name must not be empty.
  if (name.value.trim().length < 3) {
    valid = showError(name, "Please enter your full name.");
  } else {
    clearError(name);
  }

  // Email must look like an email address.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    valid = showError(email, "Please enter a valid email address.");
  } else {
    clearError(email);
  }

  // Phone must be digits, 7 to 15 characters long.
  const phonePattern = /^[0-9]{7,15}$/;
  if (!phonePattern.test(phone.value.trim())) {
    valid = showError(phone, "Please enter a valid phone number (7-15 digits).");
  } else {
    clearError(phone);
  }

  // Address must not be too short.
  if (address.value.trim().length < 5) {
    valid = showError(address, "Please enter your full delivery address.");
  } else {
    clearError(address);
  }

  return valid;
}

// Remove the error styling as soon as the user starts typing.
["name", "email", "phone", "address"].forEach(function (id) {
  document.getElementById(id).addEventListener("input", function () {
    clearError(document.getElementById(id));
  });
});

// Show the confirmation modal after a successful order.
function showConfirmation(orderNumber, total, address, payment) {
  document.getElementById("confirm-number").textContent = orderNumber;
  document.getElementById("confirm-total").textContent = "$" + total.toFixed(2);
  document.getElementById("confirm-address").textContent = address;
  document.getElementById("confirm-payment").textContent = payment;

  document.getElementById("confirm-overlay").classList.add("show");
  document.body.style.overflow = "hidden";
}

// Create a simple random order number like FOD-123456.
function makeOrderNumber() {
  return "FOD-" + Math.floor(100000 + Math.random() * 900000);
}

// Start the page.
window.addEventListener("load", function () {
  updateCartBadge();
  renderCart();
  toggleSections();
});

// Handle the Place Order button.
document.getElementById("checkout-form").addEventListener("submit", function (event) {
  event.preventDefault();

  if (getCart().length === 0) {
    alert("Your cart is empty. Please add items to your order first.");
    return;
  }

  if (!validateForm()) {
    return;
  }

  const bill = calculateBill();
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const address = document.getElementById("address").value.trim();

  showConfirmation(makeOrderNumber(), bill.total, address, payment);
  clearCart();
  renderCart();
  toggleSections();
});
