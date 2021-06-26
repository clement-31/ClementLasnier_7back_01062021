const db = require('../db_connect');
const mysql = require('mysql');

class PostRepository {
    constructor() {
        console.log('hello');
    }
    getAllPost(){
        let mySql = `SELECT post.userId, post.title, post.content, post.createdAt, user.pseudo FROM post JOIN user ON post.userId = userId ORDER BY post.createdAt DESC`;
        return new Promise((resolve) => {
            db.query(mySql, (error, result, fields) => {
                if(error) throw error;
                resolve(result);
            });
        });
    }
    getOnePost(){
        let mySql = `SELECT * FROM post WHERE post.userId = ?`;
        return new Promise((resolve) => {
            db.query(mySql, (error, result, fields) => {
                if(error) throw error;
                resolve(result);
            });
        });
    }
    newPost(mysqlInsert){
        let mySql = `INSERT INTO post VALUES(NULL,?,?,?,NOW())`;
        mySql = mysql.format(mySql, mysqlInsert) ;
        return new Promise((resolve) => {
            db.query(mySql, (error, result, fields) => {
                if(error) throw error;
                resolve({ message :'Nouveau post créé !'});
            });

        });
    }
    modifyPost(mysqlInsert1, mysqlInsert2) {
        let mySql1 = `SELECT * FROM post WHERE userId=?`;
        mySql1 = mysql.format(mySql1, mysqlInsert1);
        return new Promise((resolve) => {
            db.query(mySql1, (error, result, fields)=> {
                if(error) throw error;
                if(mySql2[3] == result[0].userId) {
                    let mySql2 = `  UPDATE post SET title = ?, content =? WHERE postId =? AND userId =?`;
                    mySql2 = ysql.format(mySql2, mysqlInsert2);
                    db.query(mySql2, (error, result, fields) =>{
                        if(error) throw error;
                        resolve({ message : 'Post modifié !'});
                    })
                }else{
                    reject({ error});

                }
            });
        });
    }
    deletePost(mysqlInsert1, mysqlInsert2) {
        let mySql1 = `SELECT * FROM post WHERE postId= ?`;
        mySql1 = mysql.format(mySql1, mysqlInsert1);
        return new Promise((resolve, reject) => {
            db.query(mySql1, (error, result, fields) => {
                if(error) throw error ;
                if(sqlinsert2[1] == result[0].userid) {
                    let mySql2 = `DELETE FROM post  WHERE postId =? AND userid =?`;
                    mySql2 = mysql.format(mySql2, mysqlInsert2);
                    db.query(mysql2, mysqlInsert2);
                    if(error) throw error;
                    resolve({ message: 'Post supprimé !'});
                }else{
                    reject({error});
                }
            });
        });
    }

}

module.exports = PostRepository;