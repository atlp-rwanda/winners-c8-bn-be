import { Op } from "sequelize";
import Models from "../database/models";
const { TripRequest } = Models;

export const getAllTrips = async ({userId,from,to}) =>{
    // console.log(userId,from,to)
    const trips = await TripRequest.findAll(
        {
            attributes: [
                'id','status','ownerId','managerId','updatedAt',
            ],
            where: {
                status: 'pending',
                ownerId: userId,
                createdAt: {
                    [Op.lt]: from,
                    [Op.gt]: to
                  },
            },

            
        },
        
        );
    return trips;
}


export const getAllManagerTrips = async ({managerId}) =>{
    const trips = await TripRequest.findAll({
        attributes: ['id','status','managerId','updatedAt'],
        where: {
            status: 'pending',
            managerId: managerId
        },
    });
    return trips;
}
