const sql = require('../models/db');

const Commentaire = function(commentaire, /*user*/){
    this.commentaire = commentaire.commentaire,
        this.commentaireDate = commentaire.commentaireDate
    /*this.pseudo = user.pseudo*/
};

Commentaire.create = (newCommentaire, result) => {
    sql.query(`INSERT INTO commentaires SET ?`, newCommentaire, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("créé un nouveau commentaire: ", { id: res.insertId, ...newCommentaire });
        result(null, { id: res.insertId, ...newCommentaire });
    });
};

Commentaire.updateById = (id, commentaire, result) => {
    sql.query(`UPDATE commentaires SET commentaire = ?, commentaireDate = ?, pseudo = ? WHERE id = ?`,
        [commentaire.contenuText, commentaire.contenuImage, commentaire.contenuDate, /*user.pseudo*/ , id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // commentaire non trouvé avec l'id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("modifier le commentaire: ", { id: id, ...commentaire });
            result(null, { id: id, ...commentaire });
        }
    );
};

Commentaire.remove = (id, result) => {
    sql.query(`DELETE FROM commentaires WHERE id = ?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // commentaire non trouvé avec l'id
            result({ kind: "non trouvé" }, null);
            return;
        }

        console.log("effacé le commentaire avec l'id: ", id);
        result(null, res);
    });
};

module.exports = Commentaire;
