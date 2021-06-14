const express = require('express');
const router = express.Router();

const commentaireCtrl = require('../controllers/commentaire');
const auth = require('../middleware/auth');

router.post('/:id', auth, commentaireCtrl.createCommentaire);
router.put('/:id', auth, commentaireCtrl.modifyCommentaire);
router.delete('/:id', auth, commentaireCtrl.deleteCommentaire);

module.exports = router;
