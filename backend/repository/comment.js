const db = require('../db_connect');
const mysql = require('mysql');



class CommentRepository {

    constructor(){
        console.log('hello');
    }

    newComment(mysqlInsert) {
        let mySql = `INSERT INTO comment VALUES ( NULL,?,?,?,NOW())`;
        mySql = mysql.format(mySql, mysqlInsert);
        return new Promise((resolve) => {
            db.query(mySql, (error, result, fields) => {
                if (error) throw error;
                resolve({ message : 'Merci pour votre commentaire !'});
            });
        });
    }
    getComment(mysqlInsert){
        let mySql = `SELECT user.userId, user.pseudo, comment.userId, comment.content, comment.createdAt FROM users INNER JOIN comment ON user.userId = comment.userId WHERE comment.postId = userId ORDER BY comment.createdAt DESC`;
        mySql = mysql.format(mySql, mysqlInsert);
        return new Promise((resolve) => {
            db.query(mySql, (error, result, fields) => {
                if (error) throw error;
                resolve(result);
            });
        });
    }
    deleteComment(mysqlInsert1, mysqlInsert2) {
        let mySql1 = `SELECT * FROM comment WHERE commentId = ?`;
        mySql1 = mysql.format(mySql1, mysqlInsert1);
        return new Promise((resolve) => {
            db.query(mySql1, (error, result, fields) => {
                if(error) throw error;
                if(myszqlInsert2[1] == reslut[0].userid) {
                    let mySql2 = `DELETE FROM comment WHERE commentId = ? and userId = ?`;
                    mySql2 = mysql.format(mySql2, (error, result, fields) => {
                        if(error) throw error;
                        resolve({ message : 'Commentaire supprimé'});
                    });
                }else{
                    reject({error})
                }
            });
        });
    }
}


module.exports = CommentRepository;