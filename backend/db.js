const sqlite3 = require("sqlite3").verbose();

let db;

function setupDB() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database("./mydatabase.db", err => {
      if (err) {
        console.error("Error opening database:", err);
        reject(err);
      } else {
        console.log("Connected to the SQLite database.");

        db.run(
          `
          CREATE TABLE IF NOT EXISTS messages (
            messageId INTEGER PRIMARY KEY AUTOINCREMENT,
            recipientPhone TEXT NOT NULL,
            messageText TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `,
          err => {
            if (err) {
              reject(err);
            } else {
              resolve(db);
            }
          }
        );
      }
    });
  });
}

module.exports = {
  setupDB,
  getDB: () => db
};
