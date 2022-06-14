
import { Router } from "express";
import auth from "./Auth";
import locations from "./locations";
import trips from "./tripRequests";
import isAuthenticated from "../middlewares/Authorization";
import userRoutes from "./usersRoutes";

const router = Router();
router.get("/users", isAuthenticated, async (req, res) => {
  res.send({
    message: "Middlewares works successful!",
  });
});
router.use('/auth', auth);
router.use('/v1/users', userRoutes)
router.use('/', index);
router.use('/user',user)
export default router;
