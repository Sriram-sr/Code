import { RequestHandler } from 'express';
import { customRequestBody } from '../middlewares/is-auth';
import {
  HTTP_STATUS,
  checkValidationError,
  errorHandler
} from '../utils/error-handlers';
import User from '../models/User';
import Book, { BookProto } from '../models/Book';

// @route  POST /api/v1/book/
// @desc   Creates a book
// access  Private(Librarian)
export const createBook: RequestHandler = (
  req: customRequestBody,
  res,
  next
) => {
  checkValidationError(req);
  const serverErrorMsg =
    'Something went wrong, could not create book currently';
  const { title, author, genre, isbnNumber } = req.body as BookProto;

  User.findById(req.userId)
    .then(user => {
      if (user?.role !== 'librarian') {
        return errorHandler(
          'Only librarian is allowed to create book',
          HTTP_STATUS.FORBIDDEN,
          next
        );
      }
      Book.findOne({ isbnNumber: isbnNumber })
        .then(existingBook => {
          if (existingBook) {
            return errorHandler(
              'Book with this Isbn is already present',
              HTTP_STATUS.BAD_REQUEST,
              next
            );
          }
          Book.create({
            title,
            author,
            genre,
            isbnNumber,
            status: 'available',
            createdUser: req.userId
          })
            .then(book => {
              res.status(HTTP_STATUS.CREATED).json({
                message: 'Successfully created book',
                book
              });
            })
            .catch(err =>
              errorHandler(
                serverErrorMsg,
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                next,
                err
              )
            );
        })
        .catch(err =>
          errorHandler(
            serverErrorMsg,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(serverErrorMsg, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};
