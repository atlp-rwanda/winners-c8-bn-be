import Models from "../database/models";
import {Sequelize, DataTypes} from "sequelize";

const { TripRequest } = Models;

export const getAllTrips = async ({userId}) =>{
    console.log(userId)
    const trips = await TripRequest.findAll(
        {
            attributes: ['id','status','ownerId','managerId','updatedAt'],
            where: {
                status: 'pending',
                ownerId: userId
            }
            // [Sequelize.fn('COUNT', Sequelize.col('TripRequest.id')), 'statistic_count']
        },
        
        );
    return trips;
}