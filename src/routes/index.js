import { Router } from "express";
import auth from "./Auth";
import trips from "./tripRequests.js";
import isAuthenticated from "../middlewares/Authorization";
import trips from "./tripRequests.js";

const router = Router();

router.use("/auth", auth);
router.use("/trip", trips);

router.get("/users", isAuthenticated, async (req, res) => {
  res.send({
    message: "Middlewares works successful!",
  });
});

router.use("/auth", auth);
router.use("/trip", trips);

export default router;
