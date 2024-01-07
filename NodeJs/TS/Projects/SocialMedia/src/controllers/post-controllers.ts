import { RequestHandler } from 'express';
import Post from '../models/Post';
import { HTTP_STATUS, errorHandler } from '../utils/error-handler';

// @route   GET api/v1/post/
// @desc    Gets all posts
// @access  Public
export const getPosts: RequestHandler = (req, res, next) => {
  const currentPage = (req.query as { page: string }).page || 1;
  const perPage = 2;

  Post.find()
    .skip((+currentPage - 1) * perPage)
    .limit(perPage)
    .then(posts => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Posts retreived successfully',
        posts: posts
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get posts currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

export const getSinglePost: RequestHandler = (req, res, next) => {
  const postId: string = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        return errorHandler(
          'Post not found for the given post ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched post',
        post
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get post currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
