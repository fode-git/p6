
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
//const helmet = require('helmet');
require('dotenv').config();
//const session = require('express-session');
const app = express();
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

/*-------onnexion à la base de données--*/
mongoose.connect('mongodb+srv://fode12:Mongodatabase2022@cluster0.wsyaaxb.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
 
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(bodyParser.json());
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

//app.use(helmet());

//app.use(session({ secret: process.env.COOKIE_KEY, cookie: { maxAge: 900000 }})) 


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

//mongoose.connect('mongodb+srv://fode12:Mongodatabase2022@cluster0.wsyaaxb.mongodb.net/?retryWrites=true&w=majority',
  