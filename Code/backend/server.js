/* Ane' Burger 24565068, 33 */

const express = require("express");
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join("frontend/public")));

app.get('/api', (req, res) => {
   res.json({ message: 'Hello from the backend!' });
});

app.get('/{*any}', (req, res) => res.sendFile(path.resolve('frontend', 'public', 'index.html')));


app.listen(port, () => {
   console.log(`Listening on http://localhost:${port}`);
});


