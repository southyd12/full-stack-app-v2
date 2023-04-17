const Car = require("../models/car.model");
const logger = require("../middleware/logger");
const { validationResult } = require("express-validator");

exports.getCars = async (req, res) => {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }

  try {
    const cars = await Car.find(query);
    res.status(200).json(cars);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};

exports.addCar = async (req, res) => {
  // Check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const carData = req.body;
  logger.info(carData);
  if(carData.avatar_url === '') {
    delete carData.avatar_url;
  }
  logger.info(carData);
  try {
    const newCar = new Car(carData);
    const result = await newCar.save();
    res.status(201).json(result);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};

exports.updateCar = async (req, res) => {
  // Check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const result = await Car.updateOne({ _id: req.params.id }, req.body);
    if (result.n === 0) return res.sendStatus(404);
    res.sendStatus(200);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};

exports.removeCar = async (req, res) => {
  try {
    const result = await Car.deleteOne({ _id: req.params.id });
    if (result.n === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};
