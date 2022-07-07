import Models from "../database/models";

const { TripRequest } = Models;

export const getAllTrips = async () =>{
    const trips = await TripRequest.findAll();
    return trips;
}