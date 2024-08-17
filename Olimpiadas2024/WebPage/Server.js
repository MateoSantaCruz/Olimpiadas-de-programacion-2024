const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Database/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});