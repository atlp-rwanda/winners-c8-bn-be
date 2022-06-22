import { Router } from "express";
import auth from "./Auth";
import trips from "./tripRequests";
import isAuthenticated from "../middlewares/Authorization";
import userRoutes from './usersRoutes'

const router = Router();

router.get("/users", isAuthenticated, async (req, res) => {
  res.send({
    message: "Middlewares works successful!",
  });
});

router.use("/auth", auth);
router.use("/trip", trips);
router.use('/v1/users', userRoutes)


export default router;
