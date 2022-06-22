import { Router } from "express";
import auth from "./auth";
import trips from "./tripRequests.js";

const router = Router();

router.use("/auth", auth);
router.use("/trip", trips);

export default router;
