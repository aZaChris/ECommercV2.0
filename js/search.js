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

      // Reindirizza alla pagina dei risultati
      window.location.href = "search-results.html";
    }
  });

  // Debug - verifica se i dati sono nel localStorage
  console.log("Current localStorage data:");
  console.log("searchTerm:", localStorage.getItem("searchTerm"));
  console.log("searchCategory:", localStorage.getItem("searchCategory"));
});
