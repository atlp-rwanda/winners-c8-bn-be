import express from "express";
const router = express.Router();
import { UserControllers } from "../controllers/usersControllers";
import verifyToken from "../middlewares/Authorization";
import { isSuperAdmin } from "../middlewares/isSuperAdmin";
import Validations from "../validations";

const addManagerValidations = Validations.verifyManager;
router.patch(
  "/assignRole",
  verifyToken,
  // isSuperAdmin,
  UserControllers.assignRole
);
router.patch(
  "/assignManager",
  verifyToken,
  // isSuperAdmin,
  addManagerValidations,
  UserControllers.assignManager
);

router.get("/managers", verifyToken, UserControllers.getManagers);
router.get("/roles", verifyToken, UserControllers.getRoles);

export default router;
