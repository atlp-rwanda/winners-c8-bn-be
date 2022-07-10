import {BookingService} from "../services/bookingServices";

class BookingRoomControllers{

    static bookARoom = async (req, res)=>{
        const {roomId} = req.params;
        const {tripId, from, to} = req.body;
        // check room existance
        const room = await BookingService.roomExist(roomId);
        if(room){
            //check room availability
            const roomAvailable = BookingService.checkRoomAvailability(room);
            
            if(roomAvailable){
                // check if trip is approved
                const trip = await BookingService.tripApproved(req.user, tripId)
                if(trip){
                    const booked = await BookingService.bookRoom(room, req.user, from, to);
                    if(booked){
                        room.isBooked = true;
                        room.save();
                        return res.status(201).json({status:201,success:true, booked, message:'Room booked successfully!'});
                    }
                    return res.status(400).json({status:400, success:false, message:'take care on dates'});
                }
                return res.status(403).json({status:403, success:false, message:'Trip need to be approved!'});
            }
            return res.status(400).json({status:400, success:false, message:'Room has been already booked!'});
        }
        return res.status(404).json({status:404, messae:'room does not exist!'});

    }
}

export {BookingRoomControllers}