const { body } = require('express-validator');

const profileValidation = [
  body('handle')
    .not()
    .isEmpty()
    .withMessage('Handle for profile is required')
    .isLength({ min: 2, max: 40 })
    .withMessage(
      'Profile handle should be within 2 to 40 characters in length'
    ),
  body('status').not().isEmpty().withMessage('status field is required'),
  body('skills').not().isEmpty().withMessage('skills field is required'),
  body('website')
    .if(body('website').exists())
    .isURL()
    .withMessage('Website should be a valid url'),
  body('company', 'Please enter valid company details')
    .if(body('company').exists())
    // incomplete
];

module.exports = profileValidation;
