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
  editLocation,
  deleteLocation,
} = locationControllers;

router.get("/", [verifyToken, isSuperAdmin], getAllLocations);

router.get("/:id", [verifyToken, isSuperAdmin], getOneLocation);

router.post(
  "/",
  [verifyToken, isSuperAdmin, locationValidator],
  createLocation
);

router.put(
  "/:id",
  [verifyToken, isSuperAdmin, locationValidator],
  editLocation
);

router.delete("/:id", [verifyToken, isSuperAdmin], deleteLocation);

export default router;
