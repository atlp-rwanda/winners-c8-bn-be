import { Op } from "sequelize";
import Models, { sequelize } from "../database/models";
const { TripRequest } = Models;

export const getAllTrips = async ({userId,from,to}) =>{
    console.log(userId,from,to)
    const approvedTrips = await TripRequest.findAll(
        {
            attributes:[ "status",
            [sequelize.fn('COUNT', sequelize.col('status')), 'statusCount']],
            group: ["status"]
            ,
            where: {
                ownerId: userId,
                createdAt: {
                    [Op.gte]: from,
                    [Op.lte]: to
                  },
            },

            
        },
        
        );
    return approvedTrips;
}


export const getAllManagerTrips = async ({managerId,from,to}) =>{
    const trips = await TripRequest.findAll({
        attributes:[ "status",
            [sequelize.fn('COUNT', sequelize.col('status')), 'statusCount']],
            group: ["status"],
        where: {
            managerId: managerId,
            createdAt: {
                [Op.gte]: from,
                [Op.lte]: to
              },
        },
    });
    return trips;
}
