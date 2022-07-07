import {tripStats} from '../services';
import errorResponse from "../utils/error";
import successResponse from "../utils/success";


export const getAllTrips = async(req,res) =>{
    try {
        const requestedTrips = await tripStats.getAllTrips();
        return successResponse(
            res,
            200,
            "Successfully retrieved all requested trips",
            requestedTrips
          );
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
};