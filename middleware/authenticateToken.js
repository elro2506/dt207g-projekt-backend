const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1]; //Token

if(!token) {
    return res.status(401).json({ message: "Token saknas" });
}

jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if(err) return res.status(403).json({ message: "Ogiltig JWT" });
//Sparar användarinformationen
    req.username = decoded;
    next();
});

}

module.exports = authenticateToken;