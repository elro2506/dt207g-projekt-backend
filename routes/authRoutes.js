/**
 * Routes som berör registrering och inloggning
 */
//Hämtar information från .env-filen
require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//User model importeras
const User = require("../models/User");



//Lägga till ny användare, behåller denna men lägger inte in den i frontend
router.post("/register", async (req, res) => {
    try {
        //hämtar användarnamn och lösenordet från request body
        const { username, password } = req.body;
//Kontrollerar att båda fälten är ifyllda
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }
//Skapar ny användare
        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "User created" });

    } catch (error) {

        //Om användaren redan finns (såg errorkod 1100 i Thunder client när jag försökte lägga till användare två gånger)
        if (error.code === 11000) {
            return res.status(500).json({ error: "Användarnamn är upptaget" });
        }
//Övriga fel
        res.status(500).json({ error: error.message });
    }
});


//Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input" });
        }

        //Finns användaren?
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Ogiltigt användarnamn eller lösenord" });
        }

        //Kolla lösenord, jämför med hashed
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Ogiltigt användarnamn eller lösenord" });
        } else {
            //Skapa JWT, lagra i payload
            const payload = { username: username };
            //skapa JWT-token
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '5h' });
            //Svar som skickas tillbaka till frontend
            const response = {
                message: "User logged in!",
                token: token
            };
            res.status(200).json({ response });
        }
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
});

//Export av router
module.exports = router;