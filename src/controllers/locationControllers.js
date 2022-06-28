/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import "dotenv/config";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import { locationServices } from "../services";

export const getAllLocations = async (req, res) => {
  try {
    const locations = await locationServices.getAllLocations();
    return successResponse(
      res,
      200,
      "Successfully retrieved all locations",
      locations
    );
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

export const getOneLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const location = await locationServices.getOneLocation(locationId);
    return successResponse(
      res,
      200,
      "Successfully retrieved location",
      location
    );
  } catch (err) {
    switch (err.message) {
      case "notFound":
        errorResponse(res, 404, "Location not found");
        break;
    }
  }
};

export const createLocation = async (req, res) => {
  const location = req.body;
  try {
    const resLocation = await locationServices.postLocation(location);
    return successResponse(res, 201, "Successfully created location");
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

export const editLocation = async (req, res) => {
  const locationId = req.params.id;
  const location = req.body;
  try {
    const resLocation = await locationServices.updateLocation(
      locationId,
      location
    );
    return successResponse(
      res,
      201,
      "Successfully updated location",
      resLocation
    );
  } catch (err) {
    switch (err.message) {
      case "notFound":
        errorResponse(res, 404, "Location not found");
        break;
    }
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const location = await locationServices.deleteLocation(locationId);
    return successResponse(res, 201, "Successfully deleted location");
  } catch (err) {
    switch (err.message) {
      case "notFound":
        errorResponse(res, 404, "Location not found");
        break;
    }
  }
};
