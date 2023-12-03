const Profile = require('../models/Profile');
const {
  errorHandler,
  checkFieldsValidation,
} = require('../utils/error-handler');

// @route   GET api/v1/profile/
// @desc    Get User Profile Information
// @access  Private
const getProfile = (req, res, next) => {
  Profile.findOne({ user: req.userId })
    .then(profile => {
      if (!profile) {
        return errorHandler(
          'No Profile found for this user, please create one',
          404,
          next
        );
      }
      res.status(200).json({
        message: 'User profile fetched successfully',
        profile: profile,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong. Could not able to fetch profile information',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/profile/
// @desc    Create User Profile
// @access  Private
const createProfile = (req, res, next) => {
  checkFieldsValidation(req);
  const {
    handle,
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubUsername,
    social,
  } = req.body;
  Profile.findOne({ handle: handle })
    .then(profile => {
      if (profile) {
        return errorHandler(
          'This profile handle exists, please try someother',
          422,
          next
        );
      }
      const newProfile = {};
      newProfile.handle = handle;
      if (company) newProfile.company = company;
      if (website) newProfile.website = website;
      if (location) newProfile.location = location;
      newProfile.status = status;
      newProfile.skills = skills.split(',');
      if (bio) newProfile.bio = bio;
      if (githubUsername) newProfile.githubUsername = githubUsername;
      if (social) {
        if (social.youtube) newProfile.social.youtube = social.youtube;
        if (social.twitter) newProfile.social.twitter = social.twitter;
        if (social.linkedin) newProfile.social.linkedin = social.linkedin;
        if (social.facebook) newProfile.social.facebook = social.facebook;
        if (social.instagram) newProfile.social.instagram = social.instagram;
      }
      newProfile.user = req.userId;

      Profile.create(newProfile)
        .then((savedProfile) => {
          res.status(201).json({
            message: 'User profile created successfully',
            profile: savedProfile,
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not create user profile',
            500,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not create user profile',
        500,
        next,
        err
      )
    );
};

module.exports = {
  getProfile,
  createProfile
};
