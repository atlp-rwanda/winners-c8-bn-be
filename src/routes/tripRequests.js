import express from "express";
import { tripControllers } from "../controllers";
import { tripValidator as tripValidation } from "../validations";

const router = express.Router();

router.get("/", tripControllers.getAllTripRequests);

router.get("/:id", tripControllers.getOneTripRequest);

router.post("/", [tripValidation], tripControllers.createTripRequest);

router.put("/:id", [tripValidation], tripControllers.editTripRequest);

router.delete("/:id", tripControllers.deleteTripRequest);

export default router;
