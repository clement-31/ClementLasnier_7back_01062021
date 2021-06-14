const sql = require('../models/db');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const MaskData = require("maskdata");

//On masque l'email
const emailMask2Options = {
    maskWith: "*",
    unmaskedStartCharactersBeforeAt: 0,
    unmaskedEndCharactersAfterAt: 0,
    maskAtTheRate: false,
};

//Création du profil utilisateur
exports.signup = (req, res, next) => {

    sql.query(`SELECT * FROM users WHERE identifiant = ?`, req.body.identifiant, function(error, _result, _fields){

        if (_result.length > 0 ){
            bcrypt.hash(req.body.password, 10)
                .then(hash =>{
                    const user = new User({
                        identifiant: req.body.identifiant,
                        pseudo: req.body.pseudo,
                        email: MaskData.maskEmail2(req.body.email, emailMask2Options),
                        password: hash
                    })

                    User.updateById(user)
                        .then(user=>{
                            res.status(200).json({success: "Utilisateur ajouté avec succès !"})
                        })
                        .catch((error) => res.status(500).json({ error }));
                })
        }
        else{
            return res.status(401).json({ message: "Impossible de trouver l'utilisateur !" })
        }
    })
};

//Connexion au profil utilisateur
exports.login = async function(req, res, next){
    const pseudo = req.body.login.pseudo;
    const password = req.body.login.password;

    if (pseudo && password){
        sql.query(`SELECT * FROM users WHERE pseudo = ?`, pseudo , function(error, results, fields) {
            if (!results || !(bcrypt.compare(password, results[0].password) )) {
                req.session.login = true;
                req.session.pseudo = pseudo;
                req.session.password = password;

                res.status(401).json({
                    message: 'Mot de passe ou pseudo incorrect !'
                })
            } else {
                const idUser = results[0].idUser;

                jwt.sign({
                    idUser : idUser,
                    pseudo: pseudo
                },"vfvfkohpovdfvdfvuhdzhvlkzehgvzeghvezghvkledv",(err, token)=>{

                    if(err){
                        res.status(400).json({error: 'erreur lors de la génération du token !'})
                    }
                    res.status(200).json({token, idUser : idUser, pseudo})
                })
            }
        });
    } else {
        res.send('Merci de rentrer un email et un mot de passe corrects !');
        res.end();
    }
};

//Suppression d'un profil utilisateur
exports.deleteUser = (req, res) => {
    User.deleteUser(req.params.idUser, (err, forum) => {
        if(err)
            res.send(err);
        res.json({ success: true, message: 'Profil utilisateur supprimé avec succès' });
    })
};