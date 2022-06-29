import express from "express";
import { tripControllers } from "../controllers";
import Validations from "../validations";
import authChecker from "../middlewares/Authorization";

const tripValidator = Validations.verifyTripRequest;

const router = express.Router();

router.get("/", [authChecker], tripControllers.getAllTripRequests);

router.get("/:id", [authChecker], tripControllers.getOneTripRequest);

router.post(
  "/",
  [authChecker, tripValidator],
  tripControllers.createTripRequest
);

router.put(
  "/:id",
  [authChecker, tripValidator],
  tripControllers.editTripRequest
);

router.delete("/:id", [authChecker], tripControllers.deleteTripRequest);

export default router;
