const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

const Menu = require("../models/Menu");

//se rätt
router.get("/", async (req, res) => {
    try {
        const menu = await Menu.find();

        res.json(menu);
    } catch(error) {
        res.status(500).json(error);
    }
});


//lägga till rätt
router.post("/", authenticateToken, async (req, res) => {
try {
    const newItem = new Menu(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
} catch(error) {
    res.status(400).json(error);
}
});

//radera rätt
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const deletedItem = await Menu.findByIdAndDelete(req.params.id); //raderar från MongoDB
res.json({ message: "Rätten är nu raderad!", deletedItem });
    } catch(error) {
        res.status(500).json(error);
    }
});

//ändra befintlig rätt
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const changedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "Du har nu ändrat något i rätten!", changedItem });
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;

