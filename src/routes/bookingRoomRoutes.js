import express from "express";
import verifyToken from "../middlewares/Authorization";
import {BookingRoomControllers}  from "../controllers/bookingRoomControllers";
import { isRequester } from "../middlewares/onlyRequester";

const router= express.Router();

router.post('/:roomId/booking', verifyToken, isRequester, BookingRoomControllers.bookARoom)

export default router;