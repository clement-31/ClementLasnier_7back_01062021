const forumModel = require('../models/forum');
const sql = require('../models/db');


//Suppression d'un forum
exports.deleteForum = (req, res) => {
    forumModel.deleteForum(req.params.idForum, (err, forum) => {
        if(err)
            res.send(err);
        res.json({ success: true, message: 'Forum supprimé avec succès' });
    })
};

//Création d'un nouveau forum
exports.createForum =(req, res) => {

    const forumReqData = (req.body.message);

    if(req.body.message.post.constructor === Object && Object.keys(req.body.message.post).length === 0){
        res.send(400).send({success: false, message: 'Veuillez remplir un champ'});
    } else {
        console.log("Valeur valide");
        forumModel.createForum(forumReqData, (err, forum) =>{
            if (err)
                res.send(err);
            res.json({status: true, message: 'Forum créé avec succès', data: forum.insertId})
        })
    }
};

//Récupération de tous les forums
exports.getAllForums = (req, res) => {
    sql.query(`SELECT * FROM forums`, (err, result) => {
        if (err) {
            console.log("Erreur lors de la récupération des forums ", err);
            res.status(500).json(err)
        } else{
            console.log("Forums récupérés avec succès", res);
            res.status(200).json({result})
        }
    });
};

//Récupération d'un forum avec l'id
exports.getOneForum = (req, res) => {
    console.log('Ici un post par son id');
    forumModel.getOneForum(req.params.idForum, (err, forum) =>{
        if (err)
            res.send(err);
        console.log('Forum par id', forum);
        res.send(forum);
    })
};
