$(document).ready(function () {
  const data = {
    products: [
      {
        id: "7",
        name: "Apple AirPods Pro",
        category: "accessories",
        searchTerms: ["apple", "airpods", "headphones", "wireless"],
        price: 249.99,
        oldPrice: 279.99,
        discount: 10,
        description: "Apple AirPods Pro with Active Noise Cancellation",
        image: "img/product07.png",
        rating: 4.9,
        stock: 15,
      },
      {
        id: "8",
        name: "Samsung Galaxy Watch 5",
        category: "accessories",
        searchTerms: ["samsung", "watch", "smartwatch", "wearable"],
        price: 279.99,
        oldPrice: 299.99,
        discount: 7,
        description: "Samsung Galaxy Watch 5 Smartwatch",
        image: "img/product08.png",
        rating: 4.6,
        stock: 12,
      },
    ],
  };

  displayResults(data.products);
});

function displayResults(products) {
  const container = $("#products-container");
  container.empty();

  if (products.length === 0) {
    container.html("<p>No accessories available.</p>");
    return;
  }

  products.forEach((product) => {
    const productHtml = `
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
        `;
    container.append(productHtml);
  });

  // Aggiungi gli event listeners dopo aver creato gli elementi
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
