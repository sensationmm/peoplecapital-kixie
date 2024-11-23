const Router = require("express");
const { sendMessage, getAllMessages, editMessage, deleteMessage } = require("../controllers/messages.controller");
const router = Router();

router.put("/messages/:id", editMessage);
router.delete("/messages/:id", deleteMessage);
router.post("/messages", sendMessage);
router.get("/messages", getAllMessages);


module.exports = router;
