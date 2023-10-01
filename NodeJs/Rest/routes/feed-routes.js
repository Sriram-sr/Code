const express = require('express');
const feedRoutes = require('../controllers/feed');

const router = express.Router();

router.get('/posts', feedRoutes.getPosts);
router.post('/post', feedRoutes.createPost);

module.exports = router;
