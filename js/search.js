$(document).ready(function () {
  // Debug
  console.log("Search.js loaded");

  // Gestione del form di ricerca
  $("#search-form").on("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted"); // Debug

    const searchTerm = $("#search-input").val().toLowerCase().trim();
    const category = $(".input-select").val();

    console.log("Search Term:", searchTerm); // Debug
    console.log("Category:", category); // Debug

    if (searchTerm) {
      // Salva i termini di ricerca nel localStorage
      localStorage.setItem("searchTerm", searchTerm);
      localStorage.setItem("searchCategory", category);

      console.log("Data saved to localStorage"); // Debug

      // Reindirizza sempre a search-results.html per i risultati di ricerca
      window.location.href = "search-results.html";
    } else if (category !== "0") {
      // Se non c'è un termine di ricerca ma c'è una categoria selezionata
      localStorage.setItem("selectedCategory", category);
      window.location.href = "categories.html";
    }
  });

  // Gestione dei click sui link delle categorie
  $(".nav-links a, .footer-links a").on("click", function (e) {
    const categoryLink = $(this).text().toLowerCase();
    if (categoryLink !== "home" && categoryLink !== "hot deals") {
      e.preventDefault();
      localStorage.setItem("selectedCategory", categoryLink);
      window.location.href = "categories.html";
    }
  });

  // Se siamo nella pagina search-results.html, mostra i risultati
  if (window.location.pathname.includes("search-results.html")) {
    const searchTerm = localStorage.getItem("searchTerm");
    const searchCategory = localStorage.getItem("searchCategory");

    // Aggiorna il sommario della ricerca
    $("#search-summary").text(`Search results for: "${searchTerm}"`);

    // Dati JSON hardcoded per test
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
      ],
    };

    const results = data.products.filter((product) => {
      const term = searchTerm.toLowerCase();
      const name = product.name.toLowerCase();
      const searchTerms = product.searchTerms || [];

      const matchesSearch =
        name.includes(term) ||
        searchTerms.some((keyword) => keyword.toLowerCase().includes(term));

      const matchesCategory =
        searchCategory === "0" || product.category === searchCategory;

      return matchesSearch && matchesCategory;
    });

    displayResults(results);
  }
});

function displayResults(products) {
  const container = $("#products-container");

  if (products.length === 0) {
    container.html("<p>No products found matching your search.</p>");
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
}

function generateStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<i class="fa fa-star${i <= rating ? "" : "-o"}"></i>`;
  }
  return stars;
}
