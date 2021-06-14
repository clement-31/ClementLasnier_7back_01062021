const sql = require('../models/db');

const User = function(user){
    this.identifiant = user.identifiant,
        this.pseudo= user.pseudo,
        this.email = user.email,
        this.password = user.password
};


//Route post signup
User.updateById = (user) => {
    console.log(user)
    sql.query(`UPDATE users SET pseudo = ?, email = ?, password = ? WHERE identifiant = ?`,
        [user.pseudo, user.email, user.password, user.identifiant],
        (err, res) => {
            if (err){
                console.log("error: ", err);
                return(err, null);
            }
            if(res.affectedRows == 0){
                console.log('Utilisateurs non trouvé !')
                return({ kind: 'Utilisateur non trouvé !' }, null);
            } else{
                console.log('création profil : ', { identifiant: user.identifiant, ...user })
                return({ identifiant: user.identifiant, ...user}, null);
            }
        });
};

//Route post login
User.findOne = (req, res) => {
    sql.query(`SELECT * FROM users WHERE pseudo = ?`, req.body.pseudo, function(error, _result, _fields){
        if (error){
            console.log(('échec'));
            return res.status(401).json({ error })
        }
    })
    {
        if (err) {
            console.log('error: ', err);
            return(err, null);
        }
        if (res.length) {
            console.log('Utilisateur trouvé: ', res[0]);
            return(null, res[0]);
        }
        return({ kind: 'Utilisateur non trouvé !' }, null);
    };
};

//Route delete User
User.deleteUser =(idUser, result) => {
    sql.query(`DELETE FROM users WHERE idUser=?`,[idUser], (err, res) => {
        if(err){
            console.log('Erreur lors de la suppression du profil utilisateur');
            result(null, err);
        } else {
            result(null, res);
        }
    })
};

module.exports = User;