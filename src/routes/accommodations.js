import express from "express";
// import accommodationController from "../controllers/accommodationsControllers";
import validateAccommodation from "../validations/accommodations";
import authChecker from "../middlewares/Authorization";
import { isTravelAdmin } from "../middlewares/accommodation/isTravelAdmin";
import accommodationMiddleware from "../middlewares/accommodation/accommodationMiddleware";
import imageUploader from "../middlewares/accommodation/imageUploader";
import accommodationController from "../controllers/accommodationsControllers"
import accomm from "../middlewares/accommodation/accomm";
const router = express.Router();

router.get("/", authChecker, isTravelAdmin , accommodationController.getAll);

router.get("/:id", authChecker, isTravelAdmin , accommodationController.getOne);

router.post("/", authChecker,
  isTravelAdmin ,
  accommodationMiddleware, 
  imageUploader,
  validateAccommodation.onCreate,
  // accomm,
  accommodationController.createOne
);

router.patch(
  "/:id", authChecker,
  isTravelAdmin ,
  accommodationMiddleware, 
  imageUploader,
  validateAccommodation.onEdit,
  // accomm,
  accommodationController.updateOne
);

router.delete("/:id", authChecker, isTravelAdmin , accommodationController.deleteOne);

export default router;
