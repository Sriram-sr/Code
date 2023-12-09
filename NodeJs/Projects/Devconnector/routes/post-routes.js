const express = require('express');
const isAuth = require('../middlewares/is-auth');
const {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment
} = require('../controllers/post-controller');

const router = express.Router();

router.route('/all').get(getAllPosts);
router.route('/:postId').get(getSinglePost).delete(isAuth, deletePost);
router.route('/').post(isAuth, createPost);
router.route('/like/:postId').post(isAuth, likePost);
router.route('/unlike/:postId').post(isAuth, unlikePost);
router.route('/comment/:postId').post(isAuth, commentPost);
router.route('/comment/delete/:postId/:commentId').delete(isAuth, deleteComment);

module.exports = router;
