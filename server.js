/**
 * Applikation för registrering och inloggning
 */
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till databasen");
}).catch((error) => {
    console.log(error);
});

const app = express();
const port = process.env.PORT || 3000;
const menuRoutes = require("./routes/menuRoutes");
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use("/api", authRoutes);
app.use("/api/menu", menuRoutes);

//Skyddad route
app.get("/api/admin", (req, res) => {
    res.json({ message: "Skyddad route" });
});

//Validera token
function authenticateToken(req, res, next) {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1]; //Token

if(token === null) res.status(401).json({ message: "Inte authentiserad för denna route - token saknas" });

jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if(err) return res.status(403).json({ message: "Ogiltig JWT" });

    req.username = decoded;
    next();
});

}

//Starta applikation
app.listen(port, () => {
    console.log(`Servern funkar på port ${port}`);
});