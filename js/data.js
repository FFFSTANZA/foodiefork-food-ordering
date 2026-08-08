// Food data for the ordering system.
// Every item has: id, name, category, price (in dollars),
// rating, reviews, image, description, and whether it is featured.
// Some items have extra toppings you can add.

const FOODS = [
  {
    id: 1,
    name: "Classic Beef Burger",
    category: "Burgers",
    price: 8.99,
    rating: 4.8,
    reviews: 1240,
    image: "images/photo-1568901346375-23c9450c58cd.jpg",
    description: "Juicy beef patty, melted cheddar, fresh lettuce, tomato and secret sauce.",
    featured: true,
    toppings: [
      { name: "Extra Cheese", price: 1.20 },
      { name: "Crispy Bacon", price: 1.80 },
      { name: "Fried Egg", price: 1.00 },
      { name: "Grilled Onions", price: 0.80 }
    ]
  },
  {
    id: 2,
    name: "BBQ Chicken Burger",
    category: "Burgers",
    price: 9.49,
    rating: 4.6,
    reviews: 860,
    image: "images/photo-1553979459-d2229ba7433b.jpg",
    description: "Grilled chicken breast with smoky BBQ sauce, coleslaw and onion rings.",
    featured: false,
    toppings: [
      { name: "Extra Cheese", price: 1.20 },
      { name: "Jalapenos", price: 0.70 }
    ]
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 12.99,
    rating: 4.9,
    reviews: 2030,
    image: "images/photo-1574071318508-1cdbab80d002.jpg",
    description: "Classic tomato sauce, fresh mozzarella and basil on a thin crispy crust.",
    featured: true,
    toppings: [
      { name: "Extra Mozzarella", price: 1.50 },
      { name: "Mushrooms", price: 1.20 },
      { name: "Olives", price: 0.90 }
    ]
  },
  {
    id: 4,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 14.49,
    rating: 4.7,
    reviews: 1750,
    image: "images/photo-1628840042765-356cda07504e.jpg",
    description: "Loaded with spicy pepperoni slices and a double layer of cheese.",
    featured: false,
    toppings: [
      { name: "Extra Pepperoni", price: 1.60 },
      { name: "Green Peppers", price: 0.80 }
    ]
  },
  {
    id: 5,
    name: "Spaghetti Bolognese",
    category: "Pasta",
    price: 11.99,
    rating: 4.5,
    reviews: 940,
    image: "images/photo-1563379926898-05f4575a45d8.jpg",
    description: "Slow-cooked meat sauce served over perfectly cooked spaghetti.",
    featured: true,
    toppings: [
      { name: "Extra Parmesan", price: 1.00 },
      { name: "Garlic Bread", price: 2.00 }
    ]
  },
  {
    id: 6,
    name: "Creamy Alfredo Pasta",
    category: "Pasta",
    price: 12.49,
    rating: 4.4,
    reviews: 720,
    image: "images/photo-1645112411341-6c4fd023714c.jpg",
    description: "Fettuccine in a rich parmesan cream sauce with grilled chicken.",
    featured: false,
    toppings: [
      { name: "Mushrooms", price: 1.20 },
      { name: "Grilled Chicken", price: 2.50 }
    ]
  },
  {
    id: 7,
    name: "Garden Fresh Salad",
    category: "Salads",
    price: 7.99,
    rating: 4.3,
    reviews: 510,
    image: "images/photo-1512621776951-a57141f2eefd.jpg",
    description: "Mixed greens, cherry tomatoes, cucumber, olives and feta cheese.",
    featured: false,
    toppings: [
      { name: "Grilled Chicken", price: 2.50 },
      { name: "Extra Feta", price: 1.00 }
    ]
  },
  {
    id: 8,
    name: "Caesar Salad",
    category: "Salads",
    price: 8.49,
    rating: 4.5,
    reviews: 680,
    image: "images/photo-1550304943-4f24f54ddde9.jpg",
    description: "Crisp romaine, parmesan shavings, croutons and creamy Caesar dressing.",
    featured: true,
    toppings: [
      { name: "Grilled Chicken", price: 2.50 },
      { name: "Extra Croutons", price: 0.50 }
    ]
  },
  {
    id: 9,
    name: "Salmon Sushi Roll",
    category: "Sushi",
    price: 10.99,
    rating: 4.9,
    reviews: 1540,
    image: "images/photo-1579871494447-9811cf80d66c.jpg",
    description: "Fresh salmon, avocado and cucumber rolled in seasoned rice.",
    featured: true,
    toppings: [
      { name: "Extra Wasabi", price: 0.50 },
      { name: "Soy Sauce Pack", price: 0.30 }
    ]
  },
  {
    id: 10,
    name: "California Roll",
    category: "Sushi",
    price: 9.49,
    rating: 4.6,
    reviews: 1120,
    image: "images/photo-1583623025817-d180a2221d0a.jpg",
    description: "Crab stick, avocado and cucumber with sesame seeds.",
    featured: false,
    toppings: [
      { name: "Extra Wasabi", price: 0.50 },
      { name: "Soy Sauce Pack", price: 0.30 }
    ]
  },
  {
    id: 11,
    name: "Crispy Chicken Tenders",
    category: "Snacks",
    price: 6.99,
    rating: 4.4,
    reviews: 890,
    image: "images/photo-1562967914-608f82629710.jpg",
    description: "Golden fried chicken tenders served with a choice of dipping sauce.",
    featured: false,
    toppings: [
      { name: "BBQ Dip", price: 0.60 },
      { name: "Honey Mustard Dip", price: 0.60 }
    ]
  },
  {
    id: 12,
    name: "Loaded Potato Fries",
    category: "Snacks",
    price: 5.99,
    rating: 4.5,
    reviews: 1030,
    image: "images/photo-1573080496219-bb080dd4f877.jpg",
    description: "Crispy fries topped with melted cheese, bacon bits and spring onion.",
    featured: true,
    toppings: [
      { name: "Extra Cheese", price: 1.20 },
      { name: "Sour Cream", price: 0.80 }
    ]
  },
  {
    id: 13,
    name: "Fresh Lemonade",
    category: "Drinks",
    price: 3.49,
    rating: 4.7,
    reviews: 640,
    image: "images/photo-1621263764928-df1444c5e859.jpg",
    description: "Ice cold freshly squeezed lemonade with a hint of mint.",
    featured: false,
    toppings: []
  },
  {
    id: 14,
    name: "Chocolate Shake",
    category: "Drinks",
    price: 4.99,
    rating: 4.8,
    reviews: 980,
    image: "images/photo-1572490122747-3968b75cc699.jpg",
    description: "Thick and creamy chocolate milkshake topped with whipped cream.",
    featured: true,
    toppings: [
      { name: "Whipped Cream Extra", price: 0.50 },
      { name: "Chocolate Chips", price: 0.60 }
    ]
  },
  {
    id: 15,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 5.49,
    rating: 4.9,
    reviews: 1330,
    image: "images/photo-1606313564200-e75d5e30476c.jpg",
    description: "Warm fudgy brownie served with a scoop of vanilla ice cream.",
    featured: true,
    toppings: [
      { name: "Extra Ice Cream", price: 1.00 },
      { name: "Chocolate Sauce", price: 0.60 }
    ]
  },
  {
    id: 16,
    name: "Strawberry Cheesecake",
    category: "Desserts",
    price: 6.49,
    rating: 4.7,
    reviews: 870,
    image: "images/photo-1565958011703-44f9829ba187.jpg",
    description: "Creamy baked cheesecake topped with fresh strawberry compote.",
    featured: false,
    toppings: []
  }
];

// The list of categories shown as filter buttons.
const CATEGORIES = ["All", "Burgers", "Pizza", "Pasta", "Salads", "Sushi", "Snacks", "Drinks", "Desserts"];

// Delivery charge: free when the subtotal is at least FREE_DELIVERY_MIN.
const FREE_DELIVERY_MIN = 30;
const DELIVERY_CHARGE = 4.99;
const TAX_RATE = 0.05;

// Small helper to find a food item by its id.
function getFoodById(id) {
  return FOODS.find(function (food) {
    return food.id === id;
  });
}
