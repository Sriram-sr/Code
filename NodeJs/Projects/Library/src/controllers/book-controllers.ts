import { RequestHandler } from 'express';
import { customRequestBody } from '../middlewares/is-auth';
import {
  HTTP_STATUS,
  checkValidationError,
  errorHandler
} from '../utils/error-handlers';
import User from '../models/User';
import Book, { BookProto } from '../models/Book';
import Member, { MemberProto } from '../models/Member';
import Transaction, { TransactionProto } from '../models/Transaction';

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

// @route  POST /api/v1/book/borrow/:bookId
// @desc   Borrows a book
// access  Private
export const borrowBook: RequestHandler = (
  req: customRequestBody,
  res,
  next
) => {
  checkValidationError(req);
  const serverErrorMsg =
    'Something went wrong, could not borrow the book currently';
  const bookId = (req.params as { bookId: string }).bookId;
  let borrowMember: MemberProto | null;
  let transaction: TransactionProto;

  Book.findById(bookId)
    .then(book => {
      if (!book) {
        return errorHandler(
          'No book found with this ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      if (book.status !== 'available') {
        return errorHandler(
          'This book is unavailable for borrow',
          HTTP_STATUS.CONFLICT,
          next
        );
      }
      Member.findOne({ userId: req.userId })
        .then(member => {
          borrowMember = member;
          return Transaction.create({
            bookId: book._id,
            memberId: member?._id,
            borrowDate: new Date(Date.now()),
            returnDate: new Date(Date.now()),
            status: 'borrowed'
          });
        })
        .then(newTransaction => {
          transaction = newTransaction;
          book.status = 'unavailable';
          return book.save();
        })
        .then(() => {
          borrowMember!.transactions?.unshift(transaction);
          return borrowMember!.save();
        })
        .then(() => {
          res.status(HTTP_STATUS.CREATED).json({
            message: 'Successfully borrowed the book',
            transaction
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
      errorHandler(serverErrorMsg, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};

// @route  POST /api/v1/book/return/:bookId
// @desc   Returns a book
// access  Private
export const returnBook: RequestHandler = (
  req: customRequestBody,
  res,
  next
) => {
  checkValidationError(req);
  const serverErrorMsg =
    'Something went wrong, could not return the book currently';
  const bookId = (req.params as { bookId: string }).bookId;
  let transaction: TransactionProto | undefined;

  Book.findById(bookId)
    .then(book => {
      if (!book || book.status !== 'unavailable') {
        return errorHandler(
          'Book may not be returned or unavailable currently',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      Transaction.findOne({ bookId: book._id })
        .then(transaction => {
          if (transaction) {
            transaction.status = 'returned';
            transaction.returnDate = new Date(Date.now());
          }
          return transaction?.save();
        })
        .then(currentTransaction => {
          transaction = currentTransaction;
          book.status = 'available';
          return book.save();
        })
        .then(() => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Sucessfully returned the book',
            transaction
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
      errorHandler(serverErrorMsg, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};
