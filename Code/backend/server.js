/* Ane' Burger 24565068, 33 */

const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join("frontend/public")));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.post('/api/signup', (req, res) => {
   const { username, surname, email, password } = req.body;
   console.log("Signup attempt: ", username, surname, email, password);
   res.json({ success: true, message: "User signed in successfully." });
});

app.post('/api/login', (req, res) => {
   const { username, password } = req.body;
   console.log("Login attempt: ", username, password);

   if(username === "test user" && password === "12345@Aa") {
      res.json({ success: true, token: "fake_jwt_token" });
   } else {
      res.status(401).json({ success: false, message: "Invalid user credentials." });
   }
});




app.get('/api', (req, res) => {
   res.json({ message: 'Hello from the backend!' });
});

app.get('/{*any}', (req, res) => res.sendFile(path.resolve('frontend', 'public', 'index.html')));


app.listen(port, () => {
   console.log(`Listening on http://localhost:${port}`);
});


