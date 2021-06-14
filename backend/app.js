const express = require('express');
const bodyParser = require('body-parser');
const xssClean = require("xss-clean");
const helmet = require("helmet");


const userRoutes = require('./routes/users');
const forumRoutes = require('./routes/forum');
const commentaireRoutes = require('./routes/commentaire');


//config multer
const path = require('path');

const app = express();

//1er middleware : CORS
//========================
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Auth-Token, X-CSRF-TOKEN, Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use (express.json ());

app.use(xssClean());
app.use(helmet());

//Routes
app.use('/api/users', userRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/commentaire', commentaireRoutes);


//Configuration multer
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports=app;