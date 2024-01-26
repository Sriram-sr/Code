import { RequestHandler } from 'express';
import { customRequestBody } from '../middlewares/is-auth';
import {
  HTTP_STATUS,
  checkValidationError,
  errorHandler
} from '../utils/error-handlers';
import { MemberProto, Address } from '../models/Member';
import Member from '../models/Member';

// route   POST /api/v1/member/
// desc    Creates a member
// access  Private
export const createMember: RequestHandler = (
  req: customRequestBody,
  res,
  next
) => {
  checkValidationError(req);
  const serverErrorMsg =
    'Something went wrong, could not create member currently';
  const { memberName, email, street, city, state, zip, country, mobile } =
    req.body as MemberProto & Address;

  Member.findOne({ userId: req.userId })
    .then(member => {
      if (member) {
        return errorHandler(
          'Member for this user already exists',
          HTTP_STATUS.CONFLICT,
          next
        );
      }
      Member.create({
        memberName,
        email,
        address: {
          street,
          city,
          state,
          zip,
          country
        },
        mobile,
        transactions: [],
        userId: req.userId
      })
        .then(member => {
          res.status(HTTP_STATUS.CREATED).json({
            message: 'Successfully created member',
            member
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
