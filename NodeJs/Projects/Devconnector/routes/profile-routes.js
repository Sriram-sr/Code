const express = require('express');
const isAuth = require('../middlewares/is-auth');
const profileValidation = require('../validation/profile-validation');
const {
  getAllProfiles,
  getProfile,
  getProfileByHandle,
  getProfileByID,
  createProfile,
  addExperienceToProfile,
  addEducationToProfile,
  deleteExperience,
  deleteEducation,
  deleteUserAndProfile
} = require('../controllers/profile-controller');

const router = express.Router();

router.route('/all').get(getAllProfiles);
router
  .route('/')
  .get(isAuth, getProfile)
  .post(profileValidation, isAuth, createProfile);
router.route('/handle/:handle').get(getProfileByHandle);
router.route('/:profileId').get(getProfileByID).delete(isAuth, deleteUserAndProfile);
router.route('/experience').put(isAuth, addExperienceToProfile);
router.route('/education').put(isAuth, addEducationToProfile);
router.route('/experience/:expId').delete(isAuth, deleteExperience);
router.route('/education/:eduId').delete(isAuth, deleteEducation);

module.exports = router;
