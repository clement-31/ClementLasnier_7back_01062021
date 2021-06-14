const mysql = require('mysql');
const dbConfig = require('../config/db.config');

//Connexion à la base de données
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

connection.connect((error) => {
    if (error) throw error;
    console.log("Connection avec succès à la DB !");
});

module.exports = connection;
