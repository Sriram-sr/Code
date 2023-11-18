const express = require('express');
const { createPostValidation } = require('../utils/validation');
const {
  getPlaces,
  getSinglePlace,
  createPlace,
  updatePlace,
  deletePlace
} = require('../controllers/places-controllers');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router
  .route('/:placeId')
  .get(getSinglePlace)
  .put(updatePlace)
  .delete(isAuth, deletePlace);
router
  .route('/')
  .get(isAuth, getPlaces)
  .post(createPostValidation, isAuth, createPlace);

module.exports = router;
