import { Router } from "express";
import verifyToken from "../middlewares/Authorization";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import Validations from "../validations";
import { locationControllers } from "../controllers";

const locationValidator = Validations.verifyLocation;

const router = Router();

const {
  getAllLocations,
  getOneLocation,
  createLocation,
  getAllDestinationStats,
  editLocation,
  deleteLocation,
} = locationControllers;

router.get("/", [verifyToken], getAllLocations);

router.get("/stats", [verifyToken], getAllDestinationStats);

router.get("/:id", [verifyToken], getOneLocation);


router.post(
  "/",
  [verifyToken, locationValidator],
  createLocation
);

router.put(
  "/:id",
  [verifyToken,  locationValidator],
  editLocation
);

router.delete("/:id", [verifyToken, ], deleteLocation);


export default router;
