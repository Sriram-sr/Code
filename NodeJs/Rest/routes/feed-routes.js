const express = require('express');
const { body } = require('express-validator');
const feedRoutes = require('../controllers/feed');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/posts', isAuth, feedRoutes.getPosts);
router.get('/post/:postId', isAuth, feedRoutes.getPost);
router.post(
  '/post',
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  isAuth,
  feedRoutes.createPost
);
router.put('/post/:postId', feedRoutes.updatePost);
router.delete('/post/:postId', isAuth, feedRoutes.deletePost);

module.exports = router;
