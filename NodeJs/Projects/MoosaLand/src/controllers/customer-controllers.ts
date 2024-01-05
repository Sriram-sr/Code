import { RequestHandler } from 'express';
import {
  checkValidationFields,
  HTTP_STATUS,
  errorHandler
} from '../utils/error-handler';
import Customer from '../models/Customer';
import Package from '../models/Package';

interface customerReqBody {
  childName: string;
  dateOfBirth: string;
  mobile: string;
  packageName: string;
  noOfChild: number;
  noOfSocks: number;
  discount: number;
  paymentMode: string;
}

// @route   POST api/v1/customer/create
// @desc    Creates new user
// @access  Public
export const createCustomer: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const {
    childName,
    dateOfBirth,
    mobile,
    packageName,
    noOfChild,
    noOfSocks,
    discount,
    paymentMode
  } = req.body as customerReqBody;

  Package.findOne({ packageName: packageName })
    .then(foundPackage => {
      return Customer.create({
        childName,
        dateOfBirth: new Date(dateOfBirth),
        mobile,
        package: foundPackage?._id,
        noOfChild,
        noOfSocks,
        discount,
        paymentMode
      });
    })
    .then(customer => {
      customer.userId = `MLN${customer._id}`;
      return customer.save();
    })
    .then(customer => {
      res.status(200).json({
        message: 'Successfully created user',
        customer
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not create user currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
