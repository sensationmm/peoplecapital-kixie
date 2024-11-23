const express = require("express");
const cors = require("cors");
const { setupDB } = require("./db");
const MessageRouter = require("./routes/messages");

const app = express();
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

// set up db
setupDB();

app.get("/status", (request, response) => {
  const status = {
    "Status": "Running"
  };

  response.send(status);
});

app.use("/", MessageRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
