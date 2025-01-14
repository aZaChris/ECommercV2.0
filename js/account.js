console.log("Account.js loaded");

$(document).ready(function () {
  // Aggiungi il modal al body
  $("body").append(`
        <div id="simple-modal">
            <div class="modal-header">
                <div class="modal-logo">
                    Electro<span class="dot">.</span>
                </div>
                <span id="close-modal" class="close-modal">&times;</span>
            </div>
            
            <div class="modal-content">
                <div class="modal-tabs">
                    <button id="login-tab" class="tab-btn active-tab">Login</button>
                    <button id="signup-tab" class="tab-btn">Sign Up</button>
                </div>

                <form id="login-form" class="auth-form active">
                    <div class="form-group">
                        <input type="email" class="form-input" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-input" placeholder="Password">
                    </div>
                    <button class="form-button">LOGIN</button>
                    <div class="forgot-password">
                        <a href="#">Forgot your password?</a>
                    </div>
                </form>

                <form id="signup-form" class="auth-form">
                    <div class="form-group">
                        <input type="text" class="form-input" placeholder="Full Name">
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-input" placeholder="Email">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-input" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-input" placeholder="Confirm Password">
                    </div>
                    <button class="form-button">SIGN UP</button>
                </form>
            </div>
        </div>
        <div id="modal-overlay"></div>
    `);

  // Gestione dei tab con animazione
  $("#login-tab").on("click", function () {
    $(".modal-tabs").removeClass("signup-active");
    $(".tab-btn").removeClass("active-tab");
    $(this).addClass("active-tab");
    $("#login-form").addClass("active");
    $("#signup-form").removeClass("active");
  });

  $("#signup-tab").on("click", function () {
    $(".modal-tabs").addClass("signup-active");
    $(".tab-btn").removeClass("active-tab");
    $(this).addClass("active-tab");
    $("#signup-form").addClass("active");
    $("#login-form").removeClass("active");
  });

  // Gestione apertura/chiusura modal
  $("#account-btn").on("click", function (e) {
    e.preventDefault();
    $("#modal-overlay, #simple-modal").fadeIn();
  });

  $("#close-modal, #modal-overlay").on("click", function () {
    $("#modal-overlay, #simple-modal").fadeOut();
  });

  $("#simple-modal").on("click", function (e) {
    e.stopPropagation();
  });
});
