const Place = require('../models/place');
const {
  errorHandler,
  checkFieldsValidation
} = require('../utils/error-handler');

const getPlaces = (req, res, next) => {
  Place.find()
    .then(places => {
      res.status(200).json({
        message: 'Places retreived successfully',
        places: places
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not find places',
        500,
        next,
        err
      )
    );
};

const getSinglePlace = (req, res, next) => {
  const placeId = req.params.placeId;
  Place.findById(placeId)
    .then(place => {
      if (!place) {
        return errorHandler('Could not find a place with given ID', 404, next);
      }
      res.status(200).json({
        message: 'Place retreived successfully',
        place: place.toObject({ getters: true })
      });
    })
    .catch(err =>
      errorHandler('Something went wrong, could not find place', 500, next, err)
    );
};

const createPlace = (req, res, next) => {
  checkFieldsValidation(req);
  const { title, description, image, address, creator } = req.body;
  const place = new Place({
    title,
    description,
    image,
    address,
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    creator
  });
  place
    .save()
    .then(place => {
      res.status(201).json({
        message: 'Created place successfully',
        place: place
      });
    })
    .catch(err =>
      errorHandler('Something went wrong, could not save place', 500, next, err)
    );
};

const updatePlace = (req, res, next) => {
  const placeId = req.params.placeId;
  const { title, description, image, address } = req.body;
  Place.findById(placeId)
    .then(place => {
      if (!place) {
        return errorHandler('Could not find a place with given ID', 404, next);
      }
      place.title = title;
      place.description = description;
      place.image = image;
      place.address = address;
      return place.save();
    })
    .then(updatedPlace => {
      res.status(200).json({
        message: 'Place updated successfully',
        place: updatedPlace
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not update place',
        500,
        next,
        err
      )
    );
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.placeId;
  Place.findById(placeId)
    .then(place => {
      if (!place) {
        return errorHandler('Could not find a place with given ID', 404, next);
      }
      return place.deleteOne();
    })
    .then(() => {
      res.status(200).json({
        message: 'Place deleted successfully'
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not delete place',
        500,
        next,
        err
      )
    );
};

module.exports = {
  getPlaces,
  getSinglePlace,
  createPlace,
  updatePlace,
  deletePlace
};
