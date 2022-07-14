import {tripStats} from '../services';
import errorResponse from "../utils/error";

export const getAllTrips = async(req,res) =>{
    const userId = req.body;
    const from = req.body;
    const to = req.body;
    try {
        const requestedTrips = await tripStats.getAllTrips(userId);
        return  res.status(200).json({
            success: true,
            status: 200,
            message: "Successfully retrieved all done trips",
            statistics: requestedTrips.length,
          });
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
};

export const getAllManagerTrips = async(req,res) =>{
    const managerId = req.body;
    const from = req.body;
    const to = req.body;
    try {
        const requestedTrips = await tripStats.getAllManagerTrips({managerId, from, to});
        return res.status(200).json({
            success: true,
            status: 200,
            message: "Successfully retrieved all done trips",
            statistics: requestedTrips.length,
          });
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
};