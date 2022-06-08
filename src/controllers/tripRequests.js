import express from "express";

export const getAllTripRequests = async (req, res) => {
  res.send("Message received").status(200);
};

export const getOneTripRequest = async (req, res) => {};

export const createTripRequest = async (req, res) => {
  res.send("Received").status(200);
};

export const editTripRequest = async (req, res) => {};

export const deleteTripRequest = async (req, res) => {};
