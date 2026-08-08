// Home page logic: shows the category boxes and the featured dishes.

// Build the small category cards at the top of the home page.
function renderCategories() {
  const grid = document.getElementById("category-grid");

  const categoryImages = {
    Burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=60",
    Pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=60",
    Pasta: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=60",
    Salads: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=60",
    Sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=60",
    Snacks: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=60",
    Drinks: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=60",
    Desserts: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=60"
  };

  CATEGORIES.slice(1).forEach(function (category) {
    const count = FOODS.filter(function (food) {
      return food.category === category;
    }).length;

    const box = document.createElement("div");
    box.className = "category-card";
    box.innerHTML =
      '<img src="' + categoryImages[category] + '" alt="' + category + '">' +
      '<div class="category-info">' +
        '<h3>' + category + '</h3>' +
        '<span>' + count + ' items</span>' +
      '</div>';

    box.addEventListener("click", function () {
      // Remember the chosen category, then open the menu page.
      localStorage.setItem("foodFilter", category);
      window.location.href = "menu.html";
    });

    grid.appendChild(box);
  });
}

// Build the featured dishes section.
function renderFeatured() {
  const grid = document.getElementById("featured-grid");

  const featured = FOODS.filter(function (food) {
    return food.featured;
  });

  featured.forEach(function (food) {
    const card = document.createElement("div");
    card.className = "food-card";

    card.innerHTML =
      '<div class="food-image">' +
        '<img src="' + food.image + '" alt="' + food.name + '">' +
        '<span class="badge-tag">Popular</span>' +
      '</div>' +
      '<div class="food-info">' +
        '<h3>' + food.name + '</h3>' +
        '<div class="food-rating">' +
          '<span class="stars">' + getStars(food.rating) + '</span>' +
          '<span class="rating-text">' + food.rating + ' (' + food.reviews + ' reviews)</span>' +
        '</div>' +
        '<p class="food-desc">' + food.description + '</p>' +
        '<div class="food-bottom">' +
          '<span class="price">₹' + food.price.toFixed(2) + '</span>' +
          '<button class="btn btn-add" data-id="' + food.id + '">+ Add</button>' +
        '</div>' +
      '</div>';

    grid.appendChild(card);
  });

  // When an Add button is clicked, jump to the menu page to customize it.
  grid.querySelectorAll(".btn-add").forEach(function (button) {
    button.addEventListener("click", function () {
      localStorage.setItem("openFood", button.dataset.id);
      window.location.href = "menu.html";
    });
  });
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

// Show the cart badge number on page load.
window.addEventListener("load", function () {
  renderCategories();
  renderFeatured();
  updateCartBadge();
});
