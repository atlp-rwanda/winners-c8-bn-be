import { Router } from "express";
import auth from "./Auth";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();

router.get("/users", isAuthenticated, async (req, res) => {
  res.send({
    message: "Middlewares works successful!",
  });
});
router.use("/auth", auth);
export default router;
