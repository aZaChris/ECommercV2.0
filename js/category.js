$(document).ready(function() {
    // Ottieni la categoria dalla pagina corrente
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    // Funzione per caricare i prodotti
    function loadProducts() {
        // In un'implementazione reale, questo sarebbe un fetch da un'API
        fetch('data/products.json')
            .then(response => response.json())
            .then(data => {
                const products = data.filter(product => product.category === currentPage);
                displayProducts(products);
            })
            .catch(error => console.error('Error:', error));
    }

    // Funzione per visualizzare i prodotti
    function displayProducts(products) {
        const container = $('#products-container');
        container.empty();

        products.forEach(product => {
            container.append(`
                <!-- product -->
                <div class="col-md-4 col-xs-6">
                    <div class="product">
                        <div class="product-img">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="product-label">
                                ${product.discount ? `<span class="sale">-${product.discount}%</span>` : ''}
                                ${product.isNew ? `<span class="new">NEW</span>` : ''}
                            </div>
                        </div>
                        <div class="product-body">
                            <p class="product-category">${product.category}</p>
                            <h3 class="product-name"><a href="#">${product.name}</a></h3>
                            <h4 class="product-price">$${product.price} 
                                ${product.oldPrice ? `<del class="product-old-price">$${product.oldPrice}</del>` : ''}
                            </h4>
                            <div class="product-rating">
                                ${generateStars(product.rating)}
                            </div>
                            <div class="product-btns">
                                <button class="add-to-wishlist"><i class="fa fa-heart-o"></i><span class="tooltipp">add to wishlist</span></button>
                                <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                                <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">quick view</span></button>
                            </div>
                        </div>
                        <div class="add-to-cart">
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                        </div>
                    </div>
                </div>
                <!-- /product -->
            `);
        });
    }

    // Funzione per generare le stelle del rating
    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<i class="fa fa-star${i <= rating ? '' : '-o'}"></i>`;
        }
        return stars;
    }

    // Carica i prodotti quando la pagina è pronta
    loadProducts();
});
