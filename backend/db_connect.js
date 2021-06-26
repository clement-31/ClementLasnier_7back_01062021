const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE

});

console.log(process.env.DB_PASSWORD);

db.connect(function(error) {
    if (error) {
        return console.log({error: 'erreur ! '});
    }
    console.log("Connecté à la base de données MySQL!");

});

module.exports = db;