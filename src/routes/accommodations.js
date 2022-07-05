import express from "express";
import validateAccommodation from "../validations/accommodations";
import authChecker from "../middlewares/Authorization";
import { isTravelAdmin } from "../middlewares/accommodation/isTravelAdmin";
import imageUploader from "../middlewares/accommodation/imageUploader";
import accommodationController from "../controllers/accommodationsControllers"

const router = express.Router();

router.get("/", authChecker, accommodationController.getAll);

router.get("/:id", authChecker, accommodationController.getOne);

router.post("/", authChecker,
  isTravelAdmin ,
  imageUploader.accommodationCreation,
  validateAccommodation.onCreate,
  accommodationController.createOne
);

router.patch(
  "/:id", authChecker,
  isTravelAdmin ,
  imageUploader.accommodationUpdate,
  validateAccommodation.onEdit,
  accommodationController.updateOne
);

router.delete("/:id", authChecker, isTravelAdmin , accommodationController.deleteOne);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/:id/rooms", authChecker, accommodationController.getAllRooms);

router.post("/:id/rooms/", authChecker,
  isTravelAdmin , 
  imageUploader.roomCreation,
  validateAccommodation.onCreateRoom,
  accommodationController.createOneRoom
);

router.patch("/:id/rooms/:roomId", authChecker,
  isTravelAdmin , 
  imageUploader.roomUpdate,
  validateAccommodation.onEditRoom,
  accommodationController.updateOneRoom
);

router.delete("/:id/rooms/:roomId", authChecker,
  isTravelAdmin ,
  accommodationController.deleteOneRoom
);


export default router;
