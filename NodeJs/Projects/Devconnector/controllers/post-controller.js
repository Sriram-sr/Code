const Post = require('../models/Post');
const Profile = require('../models/Profile');
const { errorHandler } = require('../utils/error-handler');

const raisePostNotFoundError = (message, next, err) => {
  // Error when wrong objectId is used in mongoose
  if (err.name === 'CastError') {
    return errorHandler('No post found for given post ID', 422, next);
  }
  errorHandler(message, 500, next, err);
};

// @route   GET api/v1/post/all
// @desc    Gets all posts
// @access  Public
const getAllPosts = (req, res, next) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.status(200).json({
        message: 'Successfully fetched the posts',
        postsCount: posts.length,
        posts: posts,
      });
    })
    .catch(err =>
      errorHandler(
        'Somthing went wrong, Could not get posts at the moment',
        500,
        next,
        err
      )
    );
};

// @route   GET api/v1/post/:postId
// @desc    Gets single post
// @access  Public
const getSinglePost = (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        return errorHandler('No post found for given post ID', 422, next);
      }
      res.status(200).json({
        message: 'Successfully fetched the post',
        post: post,
      });
    })
    .catch(err => {
      raisePostNotFoundError(
        (message = 'Somthing went wrong, Could not get post at the moment'),
        next,
        err
      );
    });
};

// @route   POST api/v1/post/
// @desc    Creates new post
// @access  Private
const createPost = (req, res, next) => {
  const { text, name, avatar } = req.body;
  Post.create({
    user: req.userId,
    text: text,
    name: name,
    avatar: avatar,
  })
    .then(post => {
      res.status(201).json({
        message: 'Created post successfully',
        post: post,
      });
    })
    .catch(err =>
      errorHandler(
        'Somthing went wrong, Could not create post at the moment',
        500,
        next,
        err
      )
    );
};

// @route   DELETE api/v1/post/:postId
// @desc    Deletes a post
// @access  Private
const deletePost = (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        return errorHandler('No post found for given post ID', 422, next);
      }
      if (post.user.toString() !== req.userId) {
        return errorHandler(
          'Posts created by other users cannot be deleted',
          403,
          next
        );
      }
      post
        .deleteOne()
        .then(() => {
          res.status(200).json({
            message: 'Sucessfully deleted the post',
          });
        })
        .catch(err =>
          errorHandler(
            'Somthing went wrong, Could not delete post at the moment',
            500,
            next,
            err
          )
        );
    })
    .catch(err => {
      raisePostNotFoundError(
        (message = 'Somthing went wrong, Could not delete post at the moment'),
        next,
        err
      );
    });
};

// @route   POST api/v1/post/like/:postId
// @desc    Adds like for a post
// @access  Private
const likePost = (req, res, next) => {
  Profile.findOne({ user: req.userId })
    .then(validProfile => {
      const { postId } = req.params;
      Post.findById(postId)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.userId)
              .length > 0
          ) {
            return res.status(409).json({
              message: 'Post has already been liked by the user',
            });
          }
          post.likes.unshift({ user: req.userId });
          post
            .save()
            .then(() => {
              res.status(201).json({
                message: 'Successfully liked the post',
                post: post,
              });
            })
            .catch(err =>
              errorHandler(
                'Somthing went wrong, Could not like the post at the moment',
                500,
                next,
                err
              )
            );
        })
        .catch(err =>
          raisePostNotFoundError(
            (message =
              'Somthing went wrong, Could not like the post at the moment'),
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Somthing went wrong, Could not like the post at the moment',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/post/unlike/:postId
// @desc    Adds like for a post
// @access  Private
const unlikePost = (req, res, next) => {
  Profile.findOne({ user: req.userId })
    .then(() => {
      const { postId } = req.params;
      Post.findById(postId)
        .then(post => {
          if (
            !(
              post.likes.filter(like => like.user.toString() === req.userId)
                .length > 0
            )
          ) {
            return res.status(409).json({
              message: 'User has not liked the post previously to unlike',
            });
          }
          post.likes = post.likes.filter(
            like => like.user.toString() !== req.userId
          );
          post
            .save()
            .then(() => {
              res.status(200).json({
                message: 'Successfully unliked the post',
                post: post,
              });
            })
            .catch(err =>
              errorHandler(
                'Something went wrong, Could not unlike the post at the moment',
                500,
                next,
                err
              )
            );
        })
        .catch(err =>
          raisePostNotFoundError(
            (message =
              'Something went wrong, Could not unlike the post at the moment'),
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not unlike the post at the moment',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/post/comment/:postId
// @desc    Adds comment for a post
// @access  Private
const commentPost = (req, res, next) => {
  const { postId } = req.params;
  const { text, name, avatar } = req.body;
  Profile.findOne({ user: req.userId })
    .then(() => {
      Post.findById(postId)
        .then(post => {
          post.comments.unshift({
            text,
            name,
            avatar,
            user: req.userId,
          });
          post
            .save()
            .then(() => {
              res.status(201).json({
                message: 'Comment added to the post successfully',
                post: post,
              });
            })
            .catch(err =>
              errorHandler(
                'Something went wrong, Could not add comment for the post at the moment',
                500,
                next,
                err
              )
            );
        })
        .catch(err =>
          raisePostNotFoundError(
            (message =
              'Something went wrong, Could not add comment for the post at the moment'),
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not add comment for the post at the moment',
        500,
        next,
        err
      )
    );
};

const deleteComment = (req, res, next) => {
  const { postId, commentId } = req.params;
  Profile.findOne({ user: req.userId })
    .then(() => {
      Post.findById(postId)
        .then(post => {
          const commentToDelete = post.comments.find(
            comment => comment._id.toString() === commentId
          );
          if (!commentToDelete) {
            return errorHandler(
              'There is no comment with this ID to delete for this post',
              422,
              next
            );
          }
          if (commentToDelete.user.toString() !== req.userId) {
            return errorHandler(
              'Should not delete a comment posted by other users',
              403,
              next
            );
          }
          post.comments = post.comments.filter(
            comment => comment._id.toString() !== commentId
          );
          post
            .save()
            .then(() =>
              res.status(200).json({
                message: 'Successfully deleted the comment on this post',
                post: post,
              })
            )
            .catch(err =>
              errorHandler(
                'Something went wrong, Could not delete comment at the moment',
                500,
                next,
                err
              )
            );
        })
        .catch(err =>
          raisePostNotFoundError(
            (message =
              'Something went wrong, Could not delete comment at the moment'),
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not delete comment at the moment',
        500,
        next,
        err
      )
    );
};

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  commentPost,
  deleteComment,
};
