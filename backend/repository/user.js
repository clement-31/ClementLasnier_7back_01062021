const db = require('../db_connect');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserRepository {
    constructor() {
        console.log('Hello');
    }

    signup(mysqlInsert) {
        let mySql = `INSERT INTO users VALUES(NULL,?,?,?,?,NULL)`;
        mySql = mysql.format(mySql, mysqlInsert);

        return new Promise((resolve, reject) => {
            db.query(mySql, (error, result) =>{
                if(error) {
                    reject({error : 'Email non disponible'});
                }else{
                    resolve({ message: 'Bienvenue sur notre reseau!!'});
                }
            });
        });
    }

    login(mysqlInsert, password) {
        let mySql = `SELECT * FROM users WHERE email = ?`;
        mySql = mysql.format(mySql, mysqlInsert);

        return new Promise((resolve, reject) => {
            db.query(mySql, (error, result) => {

                if(error) reject(error);
                console.log(result[0]);

                if(!result[0]) {
                    reject({ message: 'Nous ne vous avons pas trouvé !'});
                }else {
                    bcrypt.compare(password, result[0].password)
                        .then(valid => {
                            if(!valid) return reject({ message: 'Veuillez vérifier votre email et/ou votre mot de passe !'});
                            resolve({
                                userId : result[0].userId,
                                token: jwt.sign(
                                    {userId: result[0].userId
                                    },
                                    process.env.TOKEN_SECRET,
                                    {
                                        expiresIn: '24h'
                                    })
                            });
                        })
                        .catch(error => reject({error }));
                }
            });
        });
    }

    deleteAccount(mysqlInsert) {
        let mySql = `DELETE FROM users WHERE userId = ?`;
        mySql = mysql.format(mySql, mysqlInsert);
        return new Promise((resolve, reject) => {
            db.query(mySql, (error, result) => {
                if(error) return reject ({ error : 'Something went wrong !'});
                resolve({ message : 'Nous vous avons supprimé'});
            });
        });
    }
}

module.exports = UserRepository;