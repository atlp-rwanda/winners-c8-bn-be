import express from "express";
import { tripControllers, tripStats } from "../controllers";


import Validations from "../validations";
import authChecker from "../middlewares/Authorization";

const tripValidator = Validations.verifyTripRequest;

const router = express.Router();

router.get("/", [authChecker], tripControllers.getAllTripRequests);

//Trip statistics for users(travellers) and managers

router.get("/tripstatistics/:userId", tripStats.getAllTrips);
router.get("/managerstatistics/:managerId", tripStats.getAllManagerTrips);

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
router.put(
  "/:id/status",
  [authChecker, Validations.verifyTripRequestStatusUpdate],
  tripControllers.updateTripRequestStatus
);
router.delete("/:id", [authChecker], tripControllers.deleteTripRequest);

export default router;
