const path = require("path");
const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const {
  getCars,
  addCar,
  updateCar,
  removeCar,
} = require("../controllers/car.controller");

const MIN_STR_LEN = 0;
const MAX_STR_LEN = 10000;

const MIN_NAME_LEN = 2;
const MAX_NAME_LEN = 50;

const MIN_BHP = 0;
const MAX_BHP = 10000;

router
  .get("/:id?", getCars)
  .post(
    "/",
    body("name")
      .not()
      .isEmpty()
      .withMessage("Value for 'name' is required")
      .trim()
      .escape()
      .isString()
      .withMessage("Value for 'name' must be of type string")
      .isLength({ min: MIN_NAME_LEN, max: MAX_NAME_LEN })
      .withMessage(
        `Value for 'name' must be between ${MIN_NAME_LEN} and ${MAX_NAME_LEN} characters long`
      ),
    body("bhp")
      .not()
      .isEmpty()
      .withMessage("Value for 'bhp is required")
      .isInt({ min: MIN_BHP, max: MAX_BHP })
      .withMessage(
        `Value for 'bhp' must be a positive integer between ${MIN_BHP} and ${MAX_BHP}`
      ),
    body("avatar_url")
      .optional({ checkFalsy: true })
      .trim()
      .escape()
      .isLength({ min: MIN_STR_LEN, max: MAX_STR_LEN })
      .withMessage(
        `Value for 'avatar_url' must be between ${MIN_STR_LEN} and ${MAX_STR_LEN} characters long`
      )
      .isURL()
      .withMessage(`Value for 'avatar_url' must be a URL`),
    addCar
  )
  .put(
    "/:id",
    body("name")
      .optional()
      .trim()
      .escape()
      .isString()
      .withMessage("Value for 'name' must be of type string")
      .isLength({ min: MIN_NAME_LEN, max: MAX_NAME_LEN })
      .withMessage(
        `Value for 'name' must be between ${MIN_NAME_LEN} and ${MAX_NAME_LEN} characters long`
      ),
    body("bhp")
      .optional()
      .trim()
      .escape()
      .isInt({ min: MIN_BHP, max: MAX_BHP })
      .withMessage(
        `Value for 'bhp' must be a positive integer between ${MIN_BHP} and ${MAX_BHP} characters long`
      ),
    body("avatar_url")
      .optional()
      .trim()
      .escape()
      .isLength({ min: MIN_STR_LEN, max: MAX_STR_LEN })
      .withMessage(
        `Value for 'avatar_url' must be between ${MIN_STR_LEN} and ${MAX_STR_LEN} characters long`
      )
      .isURL()
      .withMessage(`Value for 'avatar_url' must be a URL`),
    updateCar
  )
  .delete("/:id", removeCar);

module.exports = router;
