const User = require('../models/User');
const Profile = require('../models/Profile');
const {
  errorHandler,
  checkFieldsValidation,
} = require('../utils/error-handler');

// @route   GET api/v1/profile/all
// @desc    Gets all user profiles
// @access  Public
const getAllProfiles = (req, res, next) => {
  Profile.find()
    .populate('user', 'name avatar')
    .then(profiles => {
      res.status(200).json({
        message: 'All profiles fetched successfully',
        totalProfiles: profiles.length,
        profiles: profiles,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong. Could not able to fetch all profiles',
        500,
        next,
        err
      )
    );
};

// @route   GET api/v1/profile/
// @desc    Gets User Profile Information
// @access  Private
const getProfile = (req, res, next) => {
  Profile.findOne({ user: req.userId })
    .populate('user', ['name', 'email'])
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

// @route   GET api/v1/profile/handle/:handle/
// @desc    Gets User Profile by handle
// @access  Public
const getProfileByHandle = (req, res, next) => {
  const handle = req.params.handle;
  Profile.findOne({ handle: handle })
    .populate('user', 'email name -_id')
    .then(profile => {
      if (!profile) {
        return errorHandler(
          'Invalid profile handle, please try someother',
          422,
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
        'Something went wrong, could not get the profile with handle',
        500,
        next,
        err
      )
    );
};

// @route   GET api/v1/profile/:profileId/
// @desc    Gets User Profile by profile ID
// @access  Public
const getProfileByID = (req, res, next) => {
  const profileId = req.params.profileId;
  Profile.findById(profileId)
    .populate('user', 'email name -_id')
    .then(profile => {
      if (!profile) {
        return errorHandler(
          'Invalid profile ID, please try someother',
          422,
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
        'Something went wrong, could not get the profile',
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
        newProfile.social = {};
        if (social.youtube) newProfile.social.youtube = social.youtube;
        if (social.twitter) newProfile.social.twitter = social.twitter;
        if (social.linkedin) newProfile.social.linkedin = social.linkedin;
        if (social.facebook) newProfile.social.facebook = social.facebook;
        if (social.instagram) newProfile.social.instagram = social.instagram;
      }
      newProfile.user = req.userId;

      Profile.create(newProfile)
        .then(savedProfile => {
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

// @route   PUT api/v1/profile/experience
// @desc    Adds experience to existing profile
// @access  Private
const addExperienceToProfile = (req, res, next) => {
  const { title, company, location, from, to, current, description } = req.body;
  Profile.findOne({ user: req.userId })
    .then(profile => {
      const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };
      profile.experience.unshift(newExperience);
      return profile.save();
    })
    .then(updatedProfile => {
      res.status(200).json({
        message: 'Updated profile with experience successfully',
        profile: updatedProfile,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not add experience to the profile',
        500,
        next,
        err
      )
    );
};

// @route   PUT api/v1/profile/education
// @desc    Adds education to existing profile
// @access  Private
const addEducationToProfile = (req, res, next) => {
  const { institution, degree, fieldOfStudy, from, to, current, description } =
    req.body;
  Profile.findOne({ user: req.userId })
    .then(profile => {
      const newEducation = {
        institution,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description,
      };
      profile.education.unshift(newEducation);
      return profile.save();
    })
    .then(updatedProfile => {
      res.status(200).json({
        message: 'Updated profile with education successfully',
        profile: updatedProfile,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not add education to the profile',
        500,
        next,
        err
      )
    );
};

// @route   DELETE api/v1/profile/experience/:expId/
// @desc    Deletes experience from existing profile
// @access  Private
const deleteExperience = (req, res, next) => {
  const experienceId = req.params.expId;
  Profile.findOne({ user: req.userId })
    .then(profile => {
      const allExperiences = profile.experience;
      const filteredExperiences = allExperiences.filter(
        exp => exp._id.toString() !== experienceId
      );
      profile.experience = filteredExperiences;
      return profile.save();
    })
    .then(updatedProfile => {
      res.status(200).json({
        message: 'Deleted experience from profile successfully',
        profile: updatedProfile,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not delete experience to the profile',
        500,
        next,
        err
      )
    );
};

// @route   DELETE api/v1/profile/education/:eduId/
// @desc    Deletes education from existing profile
// @access  Private
const deleteEducation = (req, res, next) => {
  const educationId = req.params.eduId;
  Profile.findOne({ user: req.userId })
    .then(profile => {
      const allEducations = profile.education;
      const filteredEducations = allEducations.filter(
        exp => exp._id.toString() !== educationId
      );
      profile.education = filteredEducations;
      return profile.save();
    })
    .then(updatedProfile => {
      res.status(200).json({
        message: 'Deleted experience from profile successfully',
        profile: updatedProfile,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not delete experience to the profile',
        500,
        next,
        err
      )
    );
};

// @route   DELETE api/v1/profile/:profileId/
// @desc    Deletes profile and corresponding user model
// @access  Private
const deleteUserAndProfile = (req, res, next) => {
  const { profileId } = req.params;
  Profile.findByIdAndDelete(profileId)
    .then(() => {
      return User.findByIdAndDelete(req.userId);
    })
    .then(() => {
      res.status(200).json({
        message: 'Profile and user deleted successfully',
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not delete profile',
        500,
        next,
        err
      )
    );
};

module.exports = {
  getAllProfiles,
  getProfile,
  getProfileByHandle,
  getProfileByID,
  createProfile,
  addExperienceToProfile,
  addEducationToProfile,
  deleteExperience,
  deleteEducation,
  deleteUserAndProfile,
};
