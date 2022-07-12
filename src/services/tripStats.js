import Models, { sequelize } from "../database/models";
import {Sequelize, DataTypes} from "sequelize";

const { TripRequest } = Models;

export const getAllTrips = async ({userId}) =>{
    const trips = await TripRequest.findAll(
        {
            attributes: [
                'id','status','ownerId','managerId','updatedAt',
                // [sequelize.fn('COUNT', sequelize.col('id')), 'statistic_count'],
            ],
            where: {
                status: 'pending',
                ownerId: userId
            },

            
        },
        
        );
    return trips;
}


export const getAllManagerTrips = async ({managerId}) =>{
    console.log(managerId)
    const trips = await TripRequest.findAll(
        {

            
        },
        
        );
    return trips;
}