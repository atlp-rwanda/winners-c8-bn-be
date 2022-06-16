import express from "express";
import { tripServices } from "../services";

export const getAllTripRequests = async (req, res) => {
  const user = req.user;

  try {
    const result = await tripServices.getAllTripRequests(user);
    if (result.length === 0) {
      return res.status(200).json({ message: "No Trip Requests" });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ error: err.message });
  }
};

export const getOneTripRequest = async (req, res) => {
  const user = req.user;
  const tripId = req.params.id;
  try {
    const result = await tripServices.getOneTripRequest(user, tripId);
    if (result.length === 0) {
      return res.status(200).json({ message: "No Trip Requests" });
    }
    return res.status(200).json(result);
  } catch (err) {
    switch (err.message) {
      case "manager":
        res.status(403).json({
          error: "You are not the manage of the owner of the trip request",
        });
        break;
      case "owner":
        res.status(403).json({
          error: "You are not the owner of the trip request",
        });
        break;
      case "notFound":
        res.status(404).json({ error: "The trip request not found" });
        break;
      default:
        res.status(500).json({ error: err.message });
    }
  }
};

export const createTripRequest = async (req, res) => {
  const tripRequest = req.body;

  if (tripRequest.dateOfReturn) {
    tripRequest.tripType = "return";
  } else {
    tripRequest.tripType = "oneway";
  }

  tripRequest.status = "pending";
  tripRequest.ownerId = req.user.userId;
  tripRequest.managerId = req.user.managerId;

  try {
    const result = await tripServices.createTripRequest(tripRequest);

    return res.status(201).send("Trip request successfully created");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const editTripRequest = async (req, res) => {
  const tripRequest = req.body;
  const tripRequestId = req.params.id;
  const user = req.user;

  if (tripRequest.dateOfReturn) {
    tripRequest.tripType = "return";
  } else {
    tripRequest.tripType = "oneway";
  }

  // tripRequest.status = "pending";
  // tripRequest.ownerId = req.user.userId;
  // tripRequest.managerId = req.user.managerId;

  try {
    const result = await tripServices.editTripRequest(
      tripRequest,
      tripRequestId,
      user
    );

    return res.status(201).send("Trip request successfully updated");
  } catch (err) {
    switch (err.message) {
      case "notFound":
        res.status(404).json({
          error: "Trip request not found",
        });
        break;
      case "status":
        res.status(403).json({
          error: "Trip request does not have pending status",
        });
        break;
      case "owner":
        res
          .status(403)
          .json({ error: "The user is not the owner of the trip request" });
        break;
      default:
        res.status(500).json({ error: err.message });
    }
    return;
  }
};

export const deleteTripRequest = async (req, res) => {
  const tripRequestId = req.params.id;
  const user = req.user;

  try {
    const result = await tripServices.deleteTripRequest(tripRequestId, user);

    return res.status(200).send("Trip request successfully deleted");
  } catch (err) {
    switch (err.message) {
      case "notFound":
        res.status(404).json({
          error: "Trip request not found",
        });
        break;
      case "status":
        res.status(403).json({
          error: "Trip request does not have pending status",
        });
        break;
      case "owner":
        res
          .status(403)
          .json({ error: "The user is not the owner of the trip request" });
        break;
      default:
        res.status(500).json({ error: err.message });
    }
    return;
  }
};
