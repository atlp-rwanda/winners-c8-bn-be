import express from "express";
import { tripControllers } from "../controllers";
import { tripValidator as tripValidation } from "../validations";
import authChecker from "../middlewares/auth";

const router = express.Router();

router.get("/", [authChecker], tripControllers.getAllTripRequests);

router.get("/:id", [authChecker], tripControllers.getOneTripRequest);

router.post(
  "/",
  [authChecker, tripValidation],
  tripControllers.createTripRequest
);

router.put(
  "/:id",
  [authChecker, tripValidation],
  tripControllers.editTripRequest
);

router.delete("/:id", [authChecker], tripControllers.deleteTripRequest);

export default router;
