const jwt = require('jsonwebtoken');
const PostRepository = require('../repository/post');


let postRepository = new PostRepository();



exports.getAllPost = (req, res) => {

    postRepository.getAllPost()
        .then((response) => {
            res.status(200).json({response});
        });
};

exports.newPost = (req, res) => {

    let userId = req.body.userId;
    let title = req.body.title;
    let content = req.body.content;

    let mysqlInsert = [userId, title, content];
    postRepository.newPost(mysqlInsert)
        .then((response) => {
            res.status(201).json({response});
        });
}


exports.getOnePost = (req, res) => {

    let userId = req.body.userId;
    let title = req.body.title;
    let content = req.body.content;
    let mysqlInsert= [userId, title, content];
    postRepository.getOnePost(mysqlInsert, req)
        .then((response) => {
            res.status(200).json({response});
        });
};

exports.deletePost = (req, res) =>{

    let postId = req.params.id;
    let mysqlInsert1 = [postId];
    let mysqlInsert2 = [postId, userId];
    postRepository.deletePost(mysqlInsert1, mysqlInsert2)
        .then((response) => {
            res.status(200).json({response});
        });

};

exports.modifyPost = (req, res) => {

    let title = req.body.title;
    let content = req.body.content;
    let postId = req.params.id;
    let mysqlInsert1 = [postId];
    let mysqlInsert2 = [title, content, postId, userId];
    postRepository.modifyPost(mysqlInsert1, mysqlInsert2)
        .then((response) => {
            res.status(201).json({response});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({error});
        });
};
