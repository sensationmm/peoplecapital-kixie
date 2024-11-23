const { promisify } = require("util");
const { getDB } = require("../db");

const sendMessage = (req, res) => {
  const db = getDB();
  const { recipientPhone, messageText } = req.body;

  if (!recipientPhone || !messageText) {
    return res.status(400).send({ error: "Recipient phone and message are required." });
  }

  db.run("INSERT INTO messages (recipientPhone, messageText) VALUES (?, ?)", [recipientPhone, messageText], function (err) {
    if (err) {
      console.error("Error inserting message:", err.message);
      return res.status(500).send({ error: "Error sending message" });
    }

    // get new message and send back
    const lastID = this.lastID;
    db.get("SELECT * FROM messages WHERE messageId = ?", [lastID], (err, row) => {
      if (err) {
        console.error("Error fetching message:", err.message);
        return res.status(500).send({ error: "Error fetching message" });
      }
      res.status(201).send(row);
    });
  });
};

const getAllMessages = async (req, res) => {
  const db = getDB();

  try {
    const allAsync = promisify(db.all.bind(db));
    const rows = await allAsync("SELECT * FROM messages ORDER BY timestamp DESC", []);
    res.send(rows);
  } catch (err) {
    console.error("Error fetching messages:", err.message);
    res.status(500).send({ error: "Error fetching messages" });
  }
};

const editMessage = async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const { messageText } = req.body;

  if (!messageText) {
    return res.status(400).send({ error: "Message is required." });
  }

  try {
    const runAsync = promisify(db.run.bind(db));
    await runAsync("UPDATE messages SET messageText = ?, updatedAt = CURRENT_TIMESTAMP WHERE messageId = ?", [messageText, id]);
    res.status(200).send();
  } catch (err) {
    console.error("Error updating message:", err.message);
    res.status(500).send({ error: "Error updating message" });
  }
}

const deleteMessage = async (req, res) => {
  const db = getDB();
  const { id } = req.params;

  try {
    const runAsync = promisify(db.run.bind(db));
    await runAsync("DELETE FROM messages WHERE messageId = ?", [id]);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting message:", err.message);
    res.status(500).send({ error: "Error deleting message" });
  }
}

module.exports = {
  sendMessage,
  getAllMessages,
  editMessage,
  deleteMessage,
};
