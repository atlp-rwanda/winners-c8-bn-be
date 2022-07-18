import express from "express";
import { tripControllers, tripStats } from "../controllers";
import Validations from "../validations";
import authChecker from "../middlewares/Authorization";
import commentValidation from '../validations/commentValidation';
import {Comment} from '../controllers/tripcomments';


const tripValidator = Validations.verifyTripRequest;

const router = express.Router();

router.get("/", [authChecker], tripControllers.getAllTripRequests);

//Trip statistics for users(travellers) and managers

router.get("/tripstatistics/",[authChecker], tripStats.getAllTrips);
router.get("/managerstatistics/",[authChecker], tripStats.getAllManagerTrips);

router.get("/search", [authChecker], tripControllers.searchTripRequest);

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

router.get(
	'/:tripId/comments',
  authChecker,
	Comment.getAllComments,
);
router.post(
	'/:tripId/comment',
	[commentValidation, authChecker],
	Comment.createComment,
);
router.delete('/:tripId/comments/:commentId', authChecker,
Comment.deleteComment);
export default router;
