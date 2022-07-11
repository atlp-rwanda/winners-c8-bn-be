import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import { tripServices } from "../services";
import { checkLocation } from "../services/locationServices";
import RoleService from "../services/roleServices";

export const getAllTripRequests = async (req, res) => {
  const user = req.user;

  const result = await tripServices.getAllTripRequests(user);
  // if (result.length === 0) {
  //   return res.status(200).json({ message: "No Trip Requests" });
  // }
  return res.status(200).json(result);
};

export const getOneTripRequest = async (req, res) => {
  const user = req.user;
  const tripId = req.params.id;
  try {
    const result = await tripServices.getOneTripRequest(user, tripId);
    return res.status(200).json(result);
  } catch (err) {
    switch (err.message) {
      case "manager":
        res.status(403).json({
          error: "You are not the manage of the owner of the trip request",
        });
        break;
      case "owner":
        res.status(403).json({
          error: "You are not the owner of the trip request",
        });
        break;
      case "notFound":
        res.status(404).json({ error: "The trip request not found" });
        break;
    }
  }
};

export const createTripRequest = async (req, res) => {
  const tripRequest = req.body;
  const departureValid = await checkLocation(tripRequest.departureId);
  let destinationsValid;
  if(typeof tripRequest.destinationsId == "number"|| typeof tripRequest.destinationsId == "string"){

    destinationsValid = await checkLocation(tripRequest.destinationsId);
    console.log()
    if (!destinationsValid) {
      return errorResponse(res, 400, "Invalid Destination Location");
    }
    tripRequest.destinationsId = [tripRequest.destinationsId];
    
  }
   else{
    tripRequest.destinationsId.forEach(async destinationId => {
      const destinationValid= await checkLocation(destinationId);
      if(!destinationValid){
        return errorResponse (res, 400,`Destination ${destinationId} doesn't exist.`)
      }
    })
   }
  if (!departureValid) {
    return errorResponse(res, 400, "Invalid Departure Location");
  }



  if (tripRequest.dateOfReturn) {
    tripRequest.tripType = "return";
  } else {
    tripRequest.tripType = "oneway";
  }

  tripRequest.status = "pending";
  tripRequest.ownerId = req.user.id;
  if (!req.user.managerId) {
    return errorResponse(
      res,
      403,
      "Can not create trip request without manager"
    );
  }
  tripRequest.managerId = req.user.managerId;
  let destinations = tripRequest.destinationsId;
  delete tripRequest.destinationsId
  try {
    const trip = await tripServices.createTripRequest(tripRequest, destinations);
    return res.status(201).send("Trip request successfully created");
  } catch (err) {
    console.log(err);
  }
};

export const editTripRequest = async (req, res) => {
  const tripRequest = req.body;
  const tripRequestId = req.params.id;
  try{
    await tripServices.getOneTripRequest(req.user, tripRequestId);
  const departureValid = await checkLocation(tripRequest.departureId);
  let destinationsValid;
  if(typeof tripRequest.destinationsId == "number"){
    destinationsValid = await checkLocation(tripRequest.destinationsId);
    tripRequest.destinationsId = [tripRequest.destinationsId];
    if(!destinationsValid){
      return errorResponse(res,400,"Invalid Destination Location");
    }
  }
  else{
    tripRequest.destinationsId.forEach(async destinationId => {
      const destinationValid=await checkLocation(destinationId)

      if(!destinationValid){
        return errorResponse(res, 400,`Destination ${destinationId} doesn't exist.`);
      }
    })
  }
  if (!departureValid) {
    return errorResponse(res, 400, "Invalid Departure Location");
  }

  const user = req.user;

  if (tripRequest.dateOfReturn) {
    tripRequest.tripType = "return";
  } else {
    tripRequest.tripType = "oneway";
  }

    const result = await tripServices.editTripRequest(
      tripRequest,
      tripRequestId,
      user
    );
    return res.status(201).send("Trip request successfully updated");
  } catch (err) {
    switch (err.message) {
      case "notFound":
        res.status(404).json({
          error: "Trip request not found",
        });
        break;
      case "status":
        res.status(403).json({
          error: "Trip request does not have pending status",
        });
        break;
      case "owner":
        res
          .status(403)
          .json({ error: "The user is not the owner of the trip request" });
        break;
      default:
        console.log(err);
    }
    return;
  }
};

export const deleteTripRequest = async (req, res) => {
  const tripRequestId = req.params.id;
  const user = req.user;

  try {
    const result = await tripServices.deleteTripRequest(tripRequestId, user);

    return res.status(200).send("Trip request successfully deleted");
  } catch (err) {
    switch (err.message) {
      case "notFound":
        res.status(404).json({
          error: "Trip request not found",
        });
        break;
      case "status":
        res.status(403).json({
          error: "Trip request does not have pending status",
        });
        break;
      case "owner":
        res
          .status(403)
          .json({ error: "The user is not the owner of the trip request" });
        break;
      default:
        console.log(err);
    }
    return;
  }
};

export const searchTripRequest = async (req, res) => {
  const user = req.user;

  const allowedQueries = {
    owner_id: "ownerId",
    destination: "destination",
    departure: "departure",
    departure_date: "dateOfDeparture",
    status: "status",
    type: "tripType",
  };

  let queries = {};

  let locations = {};

  Object.keys(req.query).forEach((query) => {
    // Check if query is contained in allowed queries
    const isValidQuery = Object.keys(allowedQueries).includes(query);

    if (!isValidQuery) {
      return errorResponse(res, 400, `Invalid query parameter ${query}`);
    }
    if (query == "destination" || query == "departure") {
      locations[query] = req.query[query];
    } else {
      queries[allowedQueries[query]] = req.query[query];
    }
  });

  try {
    const result = await tripServices.searchTripRequest(
      queries,
      locations,
      user
    );

    return successResponse(res, 200, "trips found", result);
  } catch (err) {
    return errorResponse(res, 500, err.message);
export const updateTripRequestStatus = async (req, res) => {
  const user = req.user;
  const tripId = req.params.id;
  const { status } = req.body;
  try {
    const userRole = await RoleService.findRoleById(user.user_role);

    const trip = await tripServices.getOneTripRequest(user, tripId);
    if (!trip) return errorResponse(res, 404, "trip not found");
    if (trip.manager.id !== user.id)
      return errorResponse(
        res,
        403,
        "You are not authorized to update trip request status"
      );
    await trip.update({ status });
    return res
      .status(200)
      .json({ message: "Trip request status updated", trip });
  } catch (err) {
    switch (err.message) {
      case "manager":
        res.status(403).json({
          error: "You are not the manage of the owner of the trip request",
        });
        break;
      case "notFound":
        res.status(404).json({ error: "The trip request not found" });
        break;
    }
  }
};
