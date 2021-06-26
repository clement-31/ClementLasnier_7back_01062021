const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');

router.get('/',auth, postCtrl.getAllPost);
router.post('/', auth, postCtrl.newPost);
router.get('/:userId', auth, postCtrl.getOnePost);
router.delete('/:userId', auth, postCtrl.deletePost);


module.exports = router;