import models from '../database/models';
import { tripServices} from "../services";
import {compareBookingDuration} from "../helpers/compareBookingDuration";

export class BookingService{
  static roomExist = async roomId =>{
    return await models.AccommodationRoom.findOne({ where: { id:roomId } });
  } 
 
    
  static checkRoomAvailability = roomObj =>{
    if(roomObj.isBooked === true){
      return false;
    }
    return true;
  }

  static tripApproved = async (user, trip)=>{
    const myTrip = await tripServices.getOneTripRequest(user, trip);
    if(myTrip.status === 'Approved'){
      return true;
    }
    return false;
  }

  static bookRoom = async(room, user, from, to)=>{
    if(compareBookingDuration(from, to)){
      return await models.BookingRoom.create({
        roomId:room.id,
        userId: user.id,
        from,
        to
      });
    }
    return null;
    
  }
  static checkBooked = async id =>{
    return await models.BookingRoom.findOne({where:{roomId:id}});
  }

  static deleteBooked = async id =>{
    return await models.BookingRoom.destroy({where:{roomId:id}});
  }
}