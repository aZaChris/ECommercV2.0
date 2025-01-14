console.log("Auth.js loaded");

class Auth {
  constructor() {
    this.initLocalStorage();
    this.setupEventListeners();
  }

  // Inizializza localStorage se non esiste
  initLocalStorage() {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }

  setupEventListeners() {
    // Login form submission
    $("#login-form").on("submit", (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    // Signup form submission
    $("#signup-form").on("submit", (e) => {
      e.preventDefault();
      this.handleSignup();
    });
  }

  // Validazione email
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Gestione Login
  handleLogin() {
    const email = $("#login-form input[type='email']").val();
    const password = $("#login-form input[type='password']").val();

    // Validazione campi
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (!this.isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    // Verifica credenziali nel localStorage
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert(`Welcome back, ${user.fullName}!`);
      $("#simple-modal, #modal-overlay").fadeOut();
      // Qui puoi aggiungere la logica per gestire la sessione utente
    } else {
      alert("Invalid email or password");
    }
  }

  // Gestione Signup
  handleSignup() {
    const fullName = $("#signup-form input[type='text']").val();
    const email = $("#signup-form input[type='email']").val();
    const password = $("#signup-form input[type='password']").eq(0).val();
    const confirmPassword = $("#signup-form input[type='password']")
      .eq(1)
      .val();

    // Validazione
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (!this.isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Verifica email duplicata nel localStorage
    const users = JSON.parse(localStorage.getItem("users"));
    if (users.some((u) => u.email === email)) {
      alert("This email is already registered");
      return;
    }

    // Crea nuovo utente
    const newUser = {
      fullName: fullName,
      email: email,
      password: password,
      registeredAt: new Date().toISOString(),
    };

    // Aggiungi alla lista e salva nel localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login");
    $("#signup-form")[0].reset();
    $("#login-tab").click();
  }
}

// Inizializza l'auth quando il documento è pronto
$(document).ready(() => {
  new Auth();
});
