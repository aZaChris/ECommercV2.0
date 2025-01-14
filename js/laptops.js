$(document).ready(function () {
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
        id: "3",
        name: "Dell XPS 13",
        category: "laptops",
        searchTerms: ["dell", "laptop", "xps", "computer"],
        price: 999.99,
        oldPrice: 1199.99,
        discount: 17,
        description: "Dell XPS 13 with Intel i7",
        image: "img/product03.png",
        rating: 4,
        stock: 8,
      },
      // Aggiungi altri laptop qui
    ],
  };

  displayResults(data.products);
});

function displayResults(products) {
  const container = $("#products-container");

  if (products.length === 0) {
    container.html("<p>No laptops available.</p>");
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
