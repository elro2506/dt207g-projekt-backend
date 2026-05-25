const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Funktion för att hasha lösenordet innan användaren sparas i databasen
userSchema.pre("save", async function () {
    if (this.isNew || this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
});

//userSchema - lagrar en ny användare
userSchema.statics.register = async function (username, password) {
    try {
        //Skapar en ny användare
        const user = new this({ username, password });
        //Sparar användaren i databasen
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

//Jämför hashed password med anvädnarens lösenord
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
} 

//Funktion för inloggning
userSchema.statics.login = async function (username, password) {
    try {
        //Söker efter användaren i databasen
        const user = await this.findOne({ username });
        if (!user) {
            throw new Error ("Felaktigt användarnamn eller lösenord");
        }
        //Jämför lösenorden
        const isPasswordMatch = await user.comparePassword(password);

        //Om felaktigt
        if (!isPasswordMatch) {
            throw new Error ("Felaktigt användarnamn eller lösenord");
        }

        //Om korrekt så returneras användaren
        return user;

    } catch (error) {
        throw error;
    }
}
//Skapar modellen USer 
const User = mongoose.model("User", userSchema);
//Exporterar denna modell
module.exports = User;