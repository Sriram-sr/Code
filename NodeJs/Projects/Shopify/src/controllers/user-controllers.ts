import { RequestHandler } from 'express';
import {
  errorHandler,
  HTTP_STATUS,
  validateObjectId,
  checkValidationFields
} from '../utils/error-handler';
import { customRequest } from '../types/custom-types';
import { updateUserReqBody } from '../types/req-body-types';
import User from '../models/User';

// @route   GET /api/v1/user/
// @desc    Gets all users
// @access  Private(Admin)
const getAllUsers: RequestHandler = (req, res, next) => {
  const currentPage = (req.query as { page: string }).page || 1;
  const perPage = 2;

  User.find()
    .skip((+currentPage - 1) * perPage)
    .limit(perPage)
    .then(users => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched users',
        users
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get users currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   GET /api/v1/user/active
// @desc    Gets currentlty logged in user
// @access  Private
const getLoggedInUser: RequestHandler = (req: customRequest, res, next) => {
  User.findOne({ _id: req.userId })
    .then(user => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched user profile',
        user
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get user profile currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   GET /api/v1/user/:userId
// @desc    Gets single user
// @access  Private
const getSingleUser: RequestHandler = (req, res, next) => {
  const userId = (req.params as { userId: string }).userId;
  validateObjectId(userId);

  User.findById(userId)
    .then(user => {
      if (!user) {
        return errorHandler(
          'No user found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched user',
        user
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get user currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   PUT /api/v1/user/:userId
// @desc    Updates user
// @access  Private
const updateUser: RequestHandler = (req: customRequest, res, next) => {
  checkValidationFields(req);
  const userId = (req.params as { userId: string }).userId;
  if (req.userId !== userId) {
    return errorHandler(
      "Cannot update other user's details",
      HTTP_STATUS.FORBIDDEN,
      next
    );
  }
  validateObjectId(userId);
  const { email, mobile, gender } = req.body as updateUserReqBody;
  const personalDetails = {
    ...(email && { email }),
    ...(mobile && { mobile }),
    ...(gender && { gender })
  };

  User.findById(userId)
    .then(user => {
      if (!user) {
        return errorHandler(
          'No user found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      user.personalDetails = personalDetails;
      user
        .save()
        .then(updatedUser => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully updated the user',
            updatedUser
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not update user currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not update user currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   DELETE /api/v1/user/:userId
// @desc    Deletes a user account
// @access  Private
const deleteUser: RequestHandler = (req: customRequest, res, next) => {
  const userId = (req.params as { userId: string }).userId;
  if (req.userId !== userId) {
    return errorHandler(
      "Cannot delete other user's details",
      HTTP_STATUS.FORBIDDEN,
      next
    );
  }
  validateObjectId(userId);

  User.findById(userId)
    .then(user => {
      if (!user) {
        return errorHandler(
          'No user found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      user
        .deleteOne()
        .then(() => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully deleted user account'
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not delete user account currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not delete user account currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   PATCH /api/v1/user/update-profile/
// @desc    Updates profile picture
// @access  Private
const updateProfilePic: RequestHandler = (req: customRequest, res, next) => {
  if (!req.file) {
    return errorHandler(
      'No image uploaded for profile picture',
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      next
    );
  }

  User.findById(req.userId)
    .then(user => {
      if (user) {
        user.profilePicture = req.file?.path;
      }
      return user?.save();
    })
    .then(updatedUser => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully updated profile',
        updatedUser
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not update profile currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

export {
  getAllUsers,
  getLoggedInUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateProfilePic
};
