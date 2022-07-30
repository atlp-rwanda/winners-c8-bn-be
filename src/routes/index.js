import { Router } from "express";
import auth from "./Auth";
import locations from "./locations";
import trips from "./tripRequests";
import isAuthenticated from "../middlewares/Authorization";
import userRoutes from "./usersRoutes";
import chatRoutes from "../routes/chatRoutes";
import accommodations from "./accommodations";
import routerAuth from "./api/users/userRoutes";
import user from './user'

const router = Router();


router.use("/auth", auth);
router.use("/trips", trips);
router.use("/locations", locations);
router.use("/accommodations", accommodations)
router.use('/user',user)
router.use("/users", userRoutes);
router.use("/oauth", routerAuth);
router.use("/users/chats", chatRoutes)
export default router;
