const products = [
  {
    id: 1,
    name: "Smartphone X",
    price: 24999,
    image: "images/product1.jpg",
    page: "product1.html",
    deal: true
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 2999,
    image: "images/product2.jpg",
    page: "product2.html",
    deal: true
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
    page: "product5.html",
    deal: true
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
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
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

function displayProducts() {
  const productList = document.getElementById("product-list");
  const search = document.getElementById("search").value.toLowerCase();
  const maxPrice = parseInt(document.getElementById("price-filter").value);
  productList.innerHTML = "";

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search) && p.price <= maxPrice
  );

  for (const product of filtered) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <a href="${product.page}" style="text-decoration:none; color:inherit;">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      </a>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
      <a href="${product.page}"><button>Buy Now</button></a>
    `;
    productList.appendChild(card);
  }
}

function displayBestDeals() {
  const dealList = document.getElementById("deal-list");
  if (!dealList) return; // skip if section isn't present
  const deals = products.filter(p => p.deal);

  dealList.innerHTML = deals.map(product => `
    <div class="product-card">
      <a href="${product.page}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      </a>
    </div>
  `).join('');
}

function updateSuggestions() {
  const searchInput = document.getElementById("search");
  const suggestions = document.getElementById("suggestions");
  const value = searchInput.value.toLowerCase();

  suggestions.innerHTML = "";

  if (value === "") return;

  const matches = products.filter(p => p.name.toLowerCase().includes(value)).slice(0, 5);
  matches.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.name;
    li.onclick = () => {
      searchInput.value = p.name;
      suggestions.innerHTML = "";
      displayProducts();
    };
    suggestions.appendChild(li);
  });
}

// Event Listeners
document.getElementById("search").addEventListener("input", () => {
  updateSuggestions();
  displayProducts();
});

document.getElementById("price-filter").addEventListener("input", () => {
  document.getElementById("price-value").textContent =
    document.getElementById("price-filter").value;
  displayProducts();
});

// Load on start
window.onload = () => {
  updateCartCount();
  displayProducts();
  displayBestDeals();
};
