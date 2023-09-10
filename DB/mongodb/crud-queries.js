// show dbs => Show all databases

// show collections => Show collections in selected database.

db.flightData.insertOne({
  departureAirport: 'Chennai',
  arrivalAirport: 'Madurai',
  aircraft: 'Kingfisher KF320',
  distance: 950,
  intercontinental: false,
});

db.flightData.insertMany([{}, {}, {}]);

db.flightData.find(); // Will find all documents in the collection

db.flightData.find({
  // Find documents matches key & value specified
  distance: 950,
});

db.flightData.find({
  // Find documents matches certain condition
  distance: { $gt: 950 },
});

db.flightData.updateOne({ distance: 960 }, { $set: { delayed: true } });
// Will update if "delayed" is present or add as new where 1st specified constraint matched in documents.

// Projection

db.passengers.find({}, { name: 1 });
// Find all documents from collection where in each collection only name key is fetched.
db.passengers.find({}, { name: 0 });
// Find all documents from collection where in each collection exclude the name key.

db.dropDatabase();
// Deletes the current database you are in.

db.numberData.drop();
// To detele a collection named 'numberData'
