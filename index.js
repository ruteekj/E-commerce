// Fetch products from API and limit to 15
async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    // Check if the products array exists and has items
    if (!data.products || data.products.length === 0) {
      console.error("No products found in the API response.");
      return;
    }

    const products = data.products.slice(0, 15); // Limit to 15 products
    const productGrid = document.getElementById("product-grid");

    // Clear existing products
    productGrid.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add(
        "product-card",
        "show",
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "overflow-hidden",
        "transform",
        "hover:scale-105",
        "transition",
        "duration-300"
      );

      card.innerHTML = `
          <div class="p-4">
          <img src="${product.images}" alt="${product.title}" class="w-full h-48 object-cover">

            <h2 class="text-lg font-semibold text-gray-700">${product.title}</h2>
            <p class="text-gray-500 mt-2">$${product.price}</p>
            <div class="flex items-center mt-2">
              <span class="bg-yellow-300 text-yellow-800 text-xs font-semibold px-2 rounded">${product.rating}</span>
              <span class="ml-2 text-gray-600">(${product.stock} in stock)</span>
            </div>
            <button class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Add to Cart
            </button>
          </div>
        `;
      productGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Run fetchProducts to load data when the page is ready
fetchProducts();

// Function to filter products based on the search input
function filterProducts() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productName = card.querySelector("h2").textContent.toLowerCase();
    if (productName.includes(searchInput)) {
      card.classList.add("show");
      card.style.display = "block"; // Make sure the card is visible
    } else {
      card.classList.remove("show");
      card.style.display = "none"; // Hide the card if it doesn't match
    }
  });
}

// <!-- JavaScript for Slide Navigation -->

let currentIndex = 0;
const slides = document.getElementById("slider").children;
const totalSlides = slides.length;

function showSlide(index) {
  const offset = -index * 100;
  document.getElementById("slider").style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
}

// Auto-slide functionality
setInterval(nextSlide, 3000); // Change slide every 3 seconds
