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

router.get("/", authChecker, accommodationController.getAll);

router.get("/:id", authChecker, accommodationController.getOne);

router.post("/", authChecker,
  isTravelAdmin ,
  accommodationMiddleware, 
  imageUploader.accommodationCreation,
  validateAccommodation.onCreate,
  // accomm,
  accommodationController.createOne
);


router.patch(
  "/:id", authChecker,
  isTravelAdmin ,
  accommodationMiddleware, 
  imageUploader.accommodationUpdate,
  validateAccommodation.onEdit,
  // accomm,
  accommodationController.updateOne
);

router.delete("/:id", authChecker, isTravelAdmin , accommodationController.deleteOne);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/:id/rooms", authChecker, accommodationController.getAllRooms);

router.post("/:id/rooms/", authChecker,
  isTravelAdmin ,
  accommodationMiddleware, 
  imageUploader.roomCreation,
  validateAccommodation.onCreateRoom,
  accommodationController.createOneRoom
);

router.patch("/:id/rooms/:roomId", authChecker,
  isTravelAdmin ,
  accommodationMiddleware,  
  imageUploader.roomUpdate,
  validateAccommodation.onEditRoom,
  accommodationController.updateOneRoom
);
router.delete("/:id/rooms/:roomId", authChecker,
  isTravelAdmin ,
  accommodationController.deleteOneRoom
);

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.post("/:id/rooms/:roomId/images/", authChecker,
//   isTravelAdmin ,
//   accommodationMiddleware, 
//   imageUploader,
//   accommodationController.createRoomImage
// );
// router.delete("/:id/rooms/:roomId/images/:imageId", authChecker,
//   isTravelAdmin ,
//   accommodationController.deleteRoomImage
// );

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.post("/:id/addonservices/", authChecker,
//   isTravelAdmin ,
//   validateAccommodation.onCreateAddOnService,
//   accommodationController.createAddOnService
// );
// router.patch("/:id/addonservices/:serviceId", authChecker,
//   isTravelAdmin ,
//   validateAccommodation.onUpdateAddOnService,
//   accommodationController.updateAddOnService
// );
// router.delete("/:id/addonservices/:serviceId", authChecker,
//   isTravelAdmin ,
//   accommodationController.deleteAddOnService
// );

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.post("/:id/amenities/", authChecker,
//   isTravelAdmin ,
//   validateAccommodation.onCreateAddOnService,
//   accommodationController.createAmenity
// );
// router.patch("/:id/amenities/:amenityId", authChecker,
//   isTravelAdmin ,
//   validateAccommodation.onUpdateAddOnService,
//   accommodationController.updateAmenity
// );
// router.delete("/:id/amenities/:amenityId", authChecker,
//   isTravelAdmin ,
//   accommodationController.deleteAmenity
// );

//////////////////////////////////////////////////////////////////////////////


export default router;
