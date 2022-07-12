import {tripStats} from '../services';
import errorResponse from "../utils/error";
import successResponse from "../utils/success";


export const getAllTrips = async(req,res) =>{
    const userId = req.body;
    // console.log(userId)
    try {
        const requestedTrips = await tripStats.getAllTrips(userId);
        console.log(requestedTrips.length)
        return successResponse(
            res,
            200,
            "Successfully retrieved all requested trips",
            requestedTrips.length
          );
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
};

export const getAllManagerTrips = async(req,res) =>{
    const managerId = req.body.managerId;
    // console.log(userId)
    try {
        const requestedTrips = await tripStats.getAllManagerTrips(managerId);
        console.log(requestedTrips.length)
        return successResponse(
            res,
            200,
            "Successfully retrieved all requested trips",
            requestedTrips.length
          );
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
};