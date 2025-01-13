$(document).ready(function () {
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
                        <h3 class="product-name"><a href="#">${
                          product.name
                        }</a></h3>
                        <h4 class="product-price">
                            $${product.price}
                            ${
                              product.oldPrice
                                ? `<del class="product-old-price">$${product.oldPrice}</del>`
                                : ""
                            }
                        </h4>
                        <div class="product-rating">
                            ${generateStars(product.rating)}
                        </div>
                        <div class="product-btns">
                            <button class="add-to-wishlist"><i class="fa fa-heart-o"></i></button>
                            <button class="add-to-compare"><i class="fa fa-exchange"></i></button>
                            <button class="quick-view"><i class="fa fa-eye"></i></button>
                        </div>
                    </div>
                    <div class="add-to-cart">
                        <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
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
