const mongoose = require("mongoose");

//Schemat för maträtterna i databasen
const menuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Ange namn"],
        //Trim tar bort eventuella mellanslag före och efter ordet
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Pris måste anges"]
    },
    category: {
        type: String,
        required: [true, "Ange kategori"],
        trim: true
    }
});

//Export av modellen Menu som i sin tur kommunicerar med collection i MongoDB-databasen
module.exports = mongoose.model("Menu", menuSchema);