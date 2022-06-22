import { Router } from "express";
import auth from "./Auth";
import trips from "./tripRequests.js";

const router = Router();

router.get("/users", async (req, res) => {
  res.send({
    message: "Nothing is set yet!",
  });
});
router.use("/auth", auth);
router.use("/trip", trips);

export default router;
