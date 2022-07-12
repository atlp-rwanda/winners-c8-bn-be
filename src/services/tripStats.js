import Models from "../database/models";
const { TripRequest } = Models;

export const getAllTrips = async ({userId}) =>{
    const trips = await TripRequest.findAll(
        {
            attributes: [
                'id','status','ownerId','managerId','updatedAt',
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
    const trips = await TripRequest.findAll({
        attributes: ['id','status','managerId','updatedAt'],
        where: {
            status: 'pending',
            managerId: managerId
        },
    });
    return trips;
}
