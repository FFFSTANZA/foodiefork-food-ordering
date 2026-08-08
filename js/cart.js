// Shared cart logic. The cart is saved in the browser so it
// stays the same when you move between the Home, Menu and Checkout pages.

const CART_KEY = "foodOrderingCart";

// Read the cart from the browser storage.
function getCart() {
  const stored = localStorage.getItem(CART_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

// Save the cart back into the browser storage.
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Count how many items are in the cart (used for the badge).
function getCartCount() {
  let count = 0;
  getCart().forEach(function (item) {
    count = count + item.quantity;
  });
  return count;
}

// Add an item to the cart. If the exact same item (same food and
// customizations) is already in the cart, just increase the quantity.
function addToCart(food, size, toppings, quantity) {
  const cart = getCart();

  const customKey = food.name + "|" + size + "|" + toppings.join(",");
  const unitPrice = calculateItemPrice(food, size, toppings);

  const existing = cart.find(function (item) {
    return item.customKey === customKey;
  });

  if (existing) {
    existing.quantity = existing.quantity + quantity;
  } else {
    cart.push({
      id: food.id,
      name: food.name,
      image: food.image,
      size: size,
      toppings: toppings,
      customKey: customKey,
      unitPrice: unitPrice,
      quantity: quantity
    });
  }

  saveCart(cart);
  updateCartBadge();
  return cart;
}

// Change the quantity of one cart item. If quantity reaches 0 the item is removed.
function changeQuantity(customKey, change) {
  let cart = getCart();
  cart = cart.map(function (item) {
    if (item.customKey === customKey) {
      item.quantity = item.quantity + change;
    }
    return item;
  });

  cart = cart.filter(function (item) {
    return item.quantity > 0;
  });

  saveCart(cart);
  updateCartBadge();
  return cart;
}

// Remove one cart item completely.
function removeFromCart(customKey) {
  let cart = getCart();
  cart = cart.filter(function (item) {
    return item.customKey !== customKey;
  });
  saveCart(cart);
  updateCartBadge();
  return cart;
}

// Clear the whole cart (used after a successful order).
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

// Work out the price of a single item after size and toppings.
function calculateItemPrice(food, size, toppings) {
  let price = food.price;

  if (size === "Medium") {
    price = price + 1.50;
  } else if (size === "Large") {
    price = price + 3.00;
  }

  toppings.forEach(function (toppingName) {
    const topping = food.toppings.find(function (t) {
      return t.name === toppingName;
    });
    if (topping) {
      price = price + topping.price;
    }
  });

  return Math.round(price * 100) / 100;
}

// Update the little number badge shown next to the cart icon.
function updateCartBadge() {
  const badge = document.querySelectorAll(".cart-badge");
  badge.forEach(function (el) {
    el.textContent = getCartCount();
  });
}
