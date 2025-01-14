const { Pool } = require("pg");

// Configurazione del database
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "nome_tuo_database",
  password: "tua_password",
  port: 5432,
});

// Prima devi creare la tabella users (esegui questo SQL una volta sola)
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Inizializza la tabella
pool
  .query(createTableQuery)
  .catch((err) => console.error("Errore creazione tabella:", err));

const auth = {
  // Registrazione nuovo utente
  signup: async (username, password) => {
    try {
      const checkUser = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (checkUser.rows.length > 0) {
        return { success: false, message: "Username già esistente" };
      }

      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [username, password]
      );

      return { success: true, message: "Registrazione completata" };
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      return { success: false, message: "Errore durante la registrazione" };
    }
  },

  // Login utente
  login: async (username, password) => {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        [username, password]
      );

      if (result.rows.length > 0) {
        return { success: true, message: "Login effettuato con successo" };
      } else {
        return { success: false, message: "Credenziali non valide" };
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      return { success: false, message: "Errore durante il login" };
    }
  },
};

module.exports = auth;
