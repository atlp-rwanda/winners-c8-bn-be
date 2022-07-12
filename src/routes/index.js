import { Router } from "express";
import auth from "./Auth";
import locations from "./locations";
import trips from "./tripRequests";
import isAuthenticated from "../middlewares/Authorization";
import userRoutes from "./usersRoutes";
import chatRoutes from "../routes/chatRoutes";
import accommodations from "./accommodations";
import bookingRoutes from "./bookingRoomRoutes";
import user from './user';
import routerAuth from "./api/users/userRoutes";


const router = Router();

router.get("/users", isAuthenticated, async (req, res) => {
  res.send({
    message: "Middlewares works successful!",
  });
});

router.use("/auth", auth);
router.use("/trips", trips);
router.use("/locations", locations);
router.use("/rooms", bookingRoutes);
router.use("/accommodations", accommodations);
router.use('/user',user);
router.use("/users", userRoutes);
router.use("/oauth", routerAuth);
router.use("/users/chats", chatRoutes)
export default router;
