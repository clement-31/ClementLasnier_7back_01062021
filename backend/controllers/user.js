const bcrypt = require('bcrypt');
const MaskData = require('maskdata');
const UserRepository = require('../repository/user');

let userRepository = new UserRepository();

exports.signup = (req, res) =>{

    const emailMask2Options = {
        maskWith: "*",
        unmaskedStartCharactersBeforeAt: 0,
        unmaskedEndCharactersAfterAt: 0,
        maskAtTheRate: false
    };
    const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);

    let email = maskedEmail;
    let pseudo = req.body.pseudo;
    let password = req.body.password;

    bcrypt.hash(password, 10)
        .then(hash => {
            let mysqlInsert = [email, pseudo, hash];
            userRepository.signup(mysqlInsert)

                .then((response) => {
                    res.status(201).json({message: "Compte créé avec succès !"});

                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({error});
                });
        })
        .catch(error => res.status(500).json(
            {error}));
};

exports.login =  (req, res) => {

    const emailMask2Options = {
        maskWith: "*",
        unmaskedStartCharactersBeforeAt: 0,
        unmaskedEndCharactersAfterAt: 0,
        maskAtTheRate: false
    }

    const maskedEmail = MaskData.maskEmail2(req.body.email,emailMask2Options);

    let email = maskedEmail;
    let password = req.body.password;
    let mysqlInsert = [email];
    userRepository.login(mysqlInsert, password)

        .then((response) => {
            res.status(200).json({response});
        })
        .catch((error) => {
            res.status(500).json({error});
        });

};

exports.deleteAccount = (req, res) => {

    userRepository.deleteAccount(mysqlInsert)

        .then((response) => {
            res.status(200).json({response});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
};