(function($) {
	"use strict"

	// Mobile Nav toggle
	$('.menu-toggle > a').on('click', function (e) {
		e.preventDefault();
		$('#responsive-nav').toggleClass('active');
	})

	// Fix cart dropdown from closing
	$('.cart-dropdown').on('click', function (e) {
		e.stopPropagation();
	});

	/////////////////////////////////////////

	// Products Slick
	$('.products-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			infinite: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
			responsive: [{
	        breakpoint: 991,
	        settings: {
	          slidesToShow: 2,
	          slidesToScroll: 1,
	        }
	      },
	      {
	        breakpoint: 480,
	        settings: {
	          slidesToShow: 1,
	          slidesToScroll: 1,
	        }
	      },
	    ]
		});
	});

	// Products Widget Slick
	$('.products-widget-slick').each(function() {
		var $this = $(this),
				$nav = $this.attr('data-nav');

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});

	/////////////////////////////////////////

	// Product Main img Slick
	$('#product-main-img').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-imgs',
  });

	// Product imgs Slick
  $('#product-imgs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
    asNavFor: '#product-main-img',
		responsive: [{
        breakpoint: 991,
        settings: {
					vertical: false,
					arrows: false,
					dots: true,
        }
      },
    ]
  });

	// Product img zoom
	var zoomMainProduct = document.getElementById('product-main-img');
	if (zoomMainProduct) {
		$('#product-main-img .product-preview').zoom();
	}

	/////////////////////////////////////////

	// Input number
	$('.input-number').each(function() {
		var $this = $(this),
		$input = $this.find('input[type="number"]'),
		up = $this.find('.qty-up'),
		down = $this.find('.qty-down');

		down.on('click', function () {
			var value = parseInt($input.val()) - 1;
			value = value < 1 ? 1 : value;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})

		up.on('click', function () {
			var value = parseInt($input.val()) + 1;
			$input.val(value);
			$input.change();
			updatePriceSlider($this , value)
		})
	});

	var priceInputMax = document.getElementById('price-max'),
			priceInputMin = document.getElementById('price-min');

	priceInputMax.addEventListener('change', function(){
		updatePriceSlider($(this).parent() , this.value)
	});

	priceInputMin.addEventListener('change', function(){
		updatePriceSlider($(this).parent() , this.value)
	});

	function updatePriceSlider(elem , value) {
		if ( elem.hasClass('price-min') ) {
			console.log('min')
			priceSlider.noUiSlider.set([value, null]);
		} else if ( elem.hasClass('price-max')) {
			console.log('max')
			priceSlider.noUiSlider.set([null, value]);
		}
	}

	// Price Slider
	var priceSlider = document.getElementById('price-slider');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [1, 999],
			connect: true,
			step: 1,
			range: {
				'min': 1,
				'max': 999
			}
		});

		priceSlider.noUiSlider.on('update', function( values, handle ) {
			var value = values[handle];
			handle ? priceInputMax.value = value : priceInputMin.value = value
		});
	}

	// Funzione per rilevare la valuta in base alla regione
	async function detectUserCurrency() {
		try {
			const response = await fetch('https://ipapi.co/json/');
			const data = await response.json();
			const currency = data.currency || 'EUR'; // Default a EUR se non rilevato
			
			// Seleziona l'icona corretta in base alla valuta
			let currencyIcon = 'fa-euro';
			if (currency === 'USD') {
				currencyIcon = 'fa-dollar';
			} else if (currency === 'GBP') {
				currencyIcon = 'fa-gbp';
			} else if (currency === 'JPY') {
				currencyIcon = 'fa-jpy';
			}

			// Aggiorna l'elemento della valuta
			const currencyElement = document.getElementById('currency-display');
			if (currencyElement) {
				currencyElement.innerHTML = `<i class="fa ${currencyIcon}"></i> ${currency}`;
			}
		} catch (error) {
			console.error('Errore nel rilevamento della valuta:', error);
		}
	}

	// Chiama la funzione quando il documento è pronto
	$(document).ready(function () {
    console.log("Document ready");

    // Verifica che l'elemento esista
    var accountBtn = $("#account-btn");
    console.log("Account button exists:", accountBtn.length);

    // Aggiungi l'evento click
    accountBtn.click(function (e) {
      e.preventDefault();
      alert("Button clicked!"); // Test con un semplice alert
    });

    // Debug
    console.group("Auth Modal Debug");
    console.log("Modal element:", $("#auth-modal"));
    console.log("Account button:", $("#account-btn"));
    console.log("Modal display:", $("#auth-modal").css("display"));
    console.groupEnd();

    // Products Slick
    $(".products-slick").each(function () {
      var $this = $(this),
        $nav = $this.attr("data-nav");

      $this.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        infinite: true,
        speed: 300,
        dots: false,
        arrows: true,
        appendArrows: $nav ? $nav : false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    });

    // Products Widget Slick
    $(".products-widget-slick").each(function () {
      var $this = $(this),
        $nav = $this.attr("data-nav");

      $this.slick({
        infinite: true,
        autoplay: true,
        speed: 300,
        dots: false,
        arrows: true,
        appendArrows: $nav ? $nav : false,
      });
    });

    // Product Main img Slick
    $("#product-main-img").slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: "#product-imgs",
    });

    // Product imgs Slick
    $("#product-imgs").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: "#product-main-img",
      responsive: [
        {
          breakpoint: 991,
          settings: {
            vertical: false,
            arrows: false,
            dots: true,
          },
        },
      ],
    });

    // Price Slider
    if ($("#price-slider").length > 0) {
      var slider = $("#price-slider")[0];
      noUiSlider.create(slider, {
        start: [1, 999],
        connect: true,
        step: 1,
        range: {
          min: 1,
          max: 999,
        },
      });
    }

    // Auth Modal
    const modal = $("#auth-modal");
    const closeBtn = $(".close-auth");
    const authTabs = $(".auth-tab");
    const loginForm = $("#login-form");
    const signupForm = $("#signup-form");

    $("#account-btn").on("click", function (e) {
      e.preventDefault();
      console.log("Account button clicked");
      modal.fadeIn();
    });

    closeBtn.on("click", function () {
      modal.fadeOut();
    });

    $(window).on("click", function (e) {
      if ($(e.target).is(modal)) {
        modal.fadeOut();
      }
    });

    authTabs.on("click", function () {
      authTabs.removeClass("active");
      $(this).addClass("active");

      if ($(this).data("tab") === "login") {
        signupForm.hide();
        loginForm.show();
      } else {
        loginForm.hide();
        signupForm.show();
      }
    });

    loginForm.on("submit", function (e) {
      e.preventDefault();
      const email = $(this).find('input[type="email"]').val();
      const password = $(this).find('input[type="password"]').val();
      console.log("Login attempt:", { email, password });
      alert("Login successful!");
      modal.fadeOut();
    });

    signupForm.on("submit", function (e) {
      e.preventDefault();
      const name = $(this).find('input[type="text"]').val();
      const email = $(this).find('input[type="email"]').val();
      const password = $(this).find('input[type="password"]').eq(0).val();
      const confirmPassword = $(this)
        .find('input[type="password"]')
        .eq(1)
        .val();

      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      console.log("Signup attempt:", { name, email, password });
      alert("Signup successful!");
      modal.fadeOut();
    });

    // Test click programmatico
    setTimeout(() => {
      console.log("Triggering click on account button...");
      $("#account-btn").trigger("click");
    }, 2000);

    // Test semplice del modal
    $("#account-btn").on("click", function (e) {
      e.preventDefault();
      console.log("Button clicked");
      $("#auth-modal").show();
    });
  });
})(jQuery);
// ... existing code ...
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
// ... existing code ...