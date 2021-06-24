const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.get('/:userId/comment', auth, userCtrl.getAllComment);
router.post('/:userId/comment', auth, userCtrl.newComment);
router.delete('/comment/:userId', auth,  userCtrl.deleteComment);

module.exports = router;
