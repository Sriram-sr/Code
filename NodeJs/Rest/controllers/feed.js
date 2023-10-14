const { validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

const handleError = (err, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};

exports.getPosts = async (req, res, next) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    let totalCount = await Post.find().countDocuments();
    const posts = await Post.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    return res.status(200).json({
      message: 'Posts retreived successfully',
      posts: posts,
      totalCount: totalCount,
    });
  } catch (err) {
    handleError(err, next)
  }
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        const err = new Error('Post not found');
        err.statusCode = 404;
        throw err;
      }
      return res
        .status(200)
        .json({ message: 'Post fetched sucessfully', post: post });
    })
    .catch(err => handleError(err, next));
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const error = new Error('There are errors in input');
    error.statusCode = 422;
    throw error;
  }

  const user = req.userId;
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = 'Random URL';
  let creator;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: user,
  });
  return post
    .save()
    .then(result => {
      User.findById(user)
        .then(user => {
          creator = user;
          user.posts.push(post);
          return user.save();
        })
        .then(() => {
          return res.status(201).json({
            message: 'Post created Sucessfully!',
            post: post,
            creator: {
              _id: creator.id,
              name: creator.name,
            },
          });
        });
    })
    .catch(err => {
      handleError(err, next);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      post.title = req.body.title;
      post.content = req.body.content;
      post.imageUrl = req.body.imageUrl;
      return post.save();
    })
    .then(post => {
      return res.status(200).json({
        message: 'Post updated successfully',
        post: post,
      });
    })
    .catch(err => {
      handleError(err, next);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  let error;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        error = new Error('Post not found for deleting');
        error.statusCode = 404;
        throw error;
      }
      if (post.creator.toString() !== req.userId) {
        error = new Error('Unauthorised user trying to delete');
        error.statusCode = 403;
        throw error;
      }
      return post.deleteOne();
    })
    .then(() => {
      User.findById(req.userId)
        .then(user => {
          user.posts.pull(postId);
          return user.save();
        })
        .then(() => {
          return res.status(200).json({
            message: 'Post deleted successfully',
          });
        });
    })
    .catch(err => handleError(err, next));
};

exports.errorHandler = handleError;
