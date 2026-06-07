# DT207G - Projektarbete backend - Elin Ronda
Detta innehåller backend-delen av mitt projektarbete i kursen DT207G

## Café Blåbär - REST API
Backend-delen är en REST-webbtjänst för det fiktiva caféet Café Blåbär. API används av frontend-delen för att hämta, lägga till, redigera och radera rätter på menyn.

Webbtjänsten innehåller också funktionalitet för registrering och inloggning. De skyddade routerna kräver en JWT-token vilket gör att endast behörig personal kan komma åt adminsidan.

### Funktionalitet
-  Anslutning till MongoDB
- Registrering av användare
- Inloggning av användare med användarnamn och lösenord
- Hashning av lösenord med bcrypt
- JWT-token fås vid lyckad inloggning
- Publik route för att hämta menyn
- SKyddad route för att lägga till, redigera och ta bort rätter på menyn
- Middleware för att kontrollera JWT-token

### Tekniker
- Node.js
- Express
- MongoDB
- Mongoose
- JWT-token
- bcrypt
- dotenv
- Render (publicering)

### Installation
Klona repot och installera npm install och starta servern med npm start. Använd npm run dev med nodemon.

### API-routes
POST finns på /api/register och /api/login för autentisering. För menyn används POST på /api/menu, GET används på /api/menu och PUT och DELETE används på /api/menu/:id.
SKyddade routes kräver en JWT-token.

### Strukturen i databasen
Ett exempel på hur en ny rätt läggs in i databasen:
{
    "title": "Blåbärspaj",
    "price": 69,
    "category": "Fika
}

### Publicering
Backend finns på denna länk: https://dt207g-projekt-backend-pw9d.onrender.com/
Frontend, den publicerade webbplatsen, finns på denna länk: https://dt207g-projekt.netlify.app/

### Skapad av
Elin Ronda
