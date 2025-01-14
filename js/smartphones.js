$(document).ready(function () {
  const data = {
    products: [
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
      {
        id: "4",
        name: "Samsung Galaxy S23",
        category: "smartphones",
        searchTerms: ["samsung", "galaxy", "smartphone", "mobile"],
        price: 899.99,
        oldPrice: 999.99,
        discount: 10,
        description: "Samsung Galaxy S23 Ultra",
        image: "img/product04.png",
        rating: 4,
        stock: 12,
      },
      // Aggiungi altri smartphone qui
    ],
  };

  displayResults(data.products);
});

function displayResults(products) {
  const container = $("#products-container");

  if (products.length === 0) {
    container.html("<p>No smartphones available.</p>");
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
