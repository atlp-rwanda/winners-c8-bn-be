import express from "express";
import verifyToken from "../middlewares/Authorization";
import {BookingRoomControllers}  from "../controllers/bookingRoomControllers";
import authChecker from "../middlewares/Authorization";
import { isTravelAdmin } from "../middlewares/accommodation/isTravelAdmin";
import { isRequester } from "../middlewares/onlyRequester";

const router= express.Router();

router.post('/:roomId/booking', verifyToken, isRequester, BookingRoomControllers.bookARoom)
router.post('/:roomId/freeRoom', authChecker, isTravelAdmin, BookingRoomControllers.freeRoom)
export default router;