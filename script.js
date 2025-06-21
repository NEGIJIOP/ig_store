// Sample product data
const products = [
  {
    id: 1,
    name: "Smartphone X",
    price: 24999,
    image: "images/product1.jpg",
    page: "product1.html"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 2999,
    image: "images/product2.jpg",
    page: "product2.html"
  },
  {
    id: 3,
    name: "Gaming Laptop",
    price: 49999,
    image: "images/product3.jpg",
    page: "product3.html"
  },
  {
    id: 4,
    name: "Smartwatch Pro",
    price: 5999,
    image: "images/product4.jpg",
    page: "product4.html"
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 1999,
    image: "images/product5.jpg",
    page: "product5.html"
  },
  {
    id: 6,
    name: "Blue  tooth Speaker",
    price: 1999,
    image: "images/product6.jpg",
    page: "product5.html"
  },
  {
    id: 7,
    name: "Bluetooth Spea  ker",
    price: 1999,
    image: "images/product7.jpg",
    page: "product5.html"
  }
];

let cart = [];

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function displayProducts() {
  const productList = document.getElementById("product-list");
  const search = document.getElementById("search").value.toLowerCase();
  const maxPrice = parseInt(document.getElementById("price-filter").value);

  // Clear product list
  productList.innerHTML = "";

  // Filter and display products
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search) && p.price <= maxPrice
  );

  for (const product of filtered) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <a href="${product.page}"><button>Buy Now</button></a>
    `;
    productList.appendChild(card);
  }
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert(`${product.name} added to cart!`);
  }
}

// Event Listeners
document.getElementById("search").addEventListener("input", displayProducts);
document.getElementById("price-filter").addEventListener("input", () => {
  document.getElementById("price-value").textContent =
    document.getElementById("price-filter").value;
  displayProducts();
});

// Initial load
window.onload = function () {
  updateCartCount();
  displayProducts();
};
