import { Op } from "sequelize";
import Models, { sequelize } from "../database/models";
const { TripRequest } = Models;

export const getAllTrips = async ({userId,from,to}) =>{
    let approvedTrips = await TripRequest.findAll(
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
        approvedTrips=JSON.parse(JSON.stringify(approvedTrips));
        const ApprovedTripsObject = {}

        for(let i = 0; i<approvedTrips.length; i++){
            ApprovedTripsObject[approvedTrips[i].status]=approvedTrips[i].statusCount
        }
    return ApprovedTripsObject;
}


export const getAllManagerTrips = async ({managerId,from,to}) =>{
    let trips = await TripRequest.findAll({
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

    trips=JSON.parse(JSON.stringify(trips));
        const TripsObject = {}

        for(let i = 0; i<trips.length; i++){
            TripsObject[trips[i].status]=trips[i].statusCount
        }
    return TripsObject;
}
