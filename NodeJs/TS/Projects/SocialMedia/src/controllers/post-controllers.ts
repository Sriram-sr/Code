import { RequestHandler } from 'express';
import Post from '../models/Post';
import { HTTP_STATUS, errorHandler } from '../utils/error-handler';

export const getPosts: RequestHandler = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Posts retreived successfully',
        totalCount: posts.length,
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

