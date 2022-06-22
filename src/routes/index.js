import { Router } from "express";
import auth from "./Auth";
import trips from "./tripRequests.js";
import isAuthenticated from "../middlewares/Authorization";

const router = Router();

router.use("/auth", auth);
router.use("/trip", trips);

router.get("/users", isAuthenticated, async (req, res) => {
  res.send({
    message: "Middlewares works successful!",
  });
});

export default router;
