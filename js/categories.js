$(document).ready(function () {
  const selectedCategory = localStorage.getItem("selectedCategory");
  const searchTerm = localStorage.getItem("searchTerm");
  const searchCategory = localStorage.getItem("searchCategory");

  // Dati di esempio
  const data = {
    products: [
      {
        id: "1",
        name: "MacBook Pro 2023",
        category: "laptops",
        searchTerms: ["macbook", "laptop", "apple", "computer"],
        price: 1299.99,
        oldPrice: 1499.99,
        discount: 13,
        description: "Latest MacBook Pro with M2 chip",
        image: "img/product01.png",
        rating: 5,
        stock: 10,
      },
      {
        id: "2",
        name: "iPhone 14 Pro",
        category: "smartphones",
        searchTerms: ["iphone", "apple", "smartphone", "mobile"],
        price: 999.99,
        oldPrice: 1099.99,
        discount: 9,
        description: "iPhone 14 Pro with dynamic island",
        image: "img/product02.png",
        rating: 4.5,
        stock: 15,
      },
      // Altri prodotti...
    ],
  };

  let results;
  let title;

  // Se c'è una categoria selezionata, filtra per quella
  if (selectedCategory) {
    title =
      selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
    results = data.products.filter(
      (product) => product.category === selectedCategory
    );
  }

  $("#category-title").text(title || "All Categories");
  displayResults(results || data.products);

  // Aggiungi gli event listeners per l'animazione del pulsante add-to-cart
  $(".add-to-cart-btn").hover(
    function () {
      $(this).css("padding", "0px 30px 0px 50px");
      $(this).find("i").css({
        opacity: "1",
        visibility: "visible",
      });
    },
    function () {
      $(this).css("padding", "0 30px");
      $(this).find("i").css({
        opacity: "0",
        visibility: "hidden",
      });
    }
  );
});

function displayResults(products) {
  const container = $("#products-container");
  container.empty();

  if (products.length === 0) {
    container.html("<p>No products found in this category.</p>");
    return;
  }

  products.forEach((product) => {
    container.append(`
      <div class="col-md-4 col-xs-6">
        <div class="product">
          <div class="product-img">
            <img src="${product.image}" alt="${product.name}">
            ${
              product.discount
                ? `
              <div class="product-label">
                <span class="sale">-${product.discount}%</span>
              </div>
            `
                : ""
            }
          </div>
          <div class="product-body">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name"><a href="#">${product.name}</a></h3>
            <h4 class="product-price">
              $${product.price.toFixed(2)}
              ${
                product.oldPrice
                  ? `<del class="product-old-price">$${product.oldPrice.toFixed(
                      2
                    )}</del>`
                  : ""
              }
            </h4>
            <div class="product-rating">
              ${generateStars(product.rating)}
            </div>
          </div>
          <div class="add-to-cart">
            <button class="add-to-cart-btn">
              <i class="fa fa-shopping-cart"></i> add to cart
            </button>
          </div>
        </div>
      </div>
    `);
  });
}

function generateStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fa fa-star${i <= rating ? "" : "-o"}"></i>`;
  }
  return stars;
}
