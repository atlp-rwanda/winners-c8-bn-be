import { get } from "config";
import Db from "../database/models";
import RoleService from "./roleServices";

const { findRoleById } = RoleService;

const TripRequest = Db.TripRequest;
const TripRequestDestination = Db.TripRequestDestination;

const tripAttributes = [
  "id",
  "status",
  "travel_reason",
  "accommodationId",
  "dateOfDeparture",
  "dateOfReturn",
  "tripType",
];

const tripInclude = [
  {
    model: Db.User,
    as: "manager",
    attributes: ["id", "firstName", "lastName", "email"],
  },
  {
    model: Db.User,
    as: "owner",
    attributes: ["id", "firstName", "lastName", "email"],
  },
  {
    model: Db.Location,
    as: "departure",
    attributes: ["id", "city", "state", "province", "country"],
  },
  {
    model: Db.Location,
    as: "destinations",
  },
];

export const getAllTripRequests = async (user) => {
  let result;

  if ((await findRoleById(user.user_role)).roleName == "manager") {
    result = await TripRequest.findAll({
      where: {
        managerId: user.id,
      },
      include: tripInclude,
      attributes: tripAttributes,
    });
  } else {
    result = await TripRequest.findAll({
      where: {
        ownerId: user.id,
      },
      include: tripInclude,
      attributes: tripAttributes,
    });
  }
  return result;
};

export const getOneTripRequest = async (user, tripId) => {
  const result = await TripRequest.findOne({
    where: {
      id: tripId,
    },
    include: tripInclude,
    attributes: tripAttributes,
  });

  if (result == null) {
    throw new Error("notFound");
  }

  if (
    (await findRoleById(user.user_role)).roleName == "manager" &&
    result.manager.id != user.id
  ) {
    throw new Error("manager");
  }

  if (
    (await findRoleById(user.user_role)).roleName == "requester" &&
    result.owner.id != user.id
  ) {
    throw new Error("owner");
  }

  return result;
};

export const createTripRequest = async (tripRequest, destinations) => {
  const result = await TripRequest.create(tripRequest);

  destinations.forEach(async (destination) => {
    await addDestination(result.dataValues.id, destination);
  });

  return result;
};

export const editTripRequest = async (tripRequest, tripRequestId, user) => {
  const tripRequestToUpdate = await TripRequest.findOne({
    where: {
      id: tripRequestId,
    },
  });

  if (!tripRequestToUpdate) {
    throw new Error("notFound");
  }

  if (tripRequestToUpdate.status !== "pending") {
    throw new Error("status");
  }

  if (tripRequestToUpdate.ownerId !== user.id) {
    throw new Error("owner");
  }

  tripRequest.id = tripRequestToUpdate.id;
  tripRequest.ownerId = tripRequestToUpdate.ownerId;
  tripRequest.managerId = tripRequestToUpdate.managerId;
  tripRequest.status = tripRequestToUpdate.status;
  tripRequest.updatedAt = new Date();

  const destinations = tripRequest.destinationsId;
  delete tripRequest.destinationsId;
  const result = await TripRequest.upsert(tripRequest);

  editDestination(tripRequestId, destinations);

  return result;
};

export const deleteTripRequest = async (tripRequestId, user) => {
  const tripRequest = await TripRequest.findOne({
    where: {
      id: tripRequestId,
    },
  });

  if (!tripRequest) {
    throw new Error("notFound");
  }

  if (tripRequest.status !== "pending") {
    throw new Error("status");
  }

  if (!(tripRequest.ownerId === user.id)) {
    throw new Error("owner");
  }

  const result = await TripRequest.destroy({
    where: {
      id: tripRequest.id,
    },
  });

  return result;
};

export const searchTripRequest = async (queryParameters, locations, user) => {
  let trips;

  if ((await findRoleById(user.user_role)).roleName == "manager") {
    trips = await TripRequest.findAll({
      where: {
        ...queryParameters,
        managerId: user.id,
      },
      include: tripInclude,
      attributes: tripAttributes,
    });
  } else {
    trips = await TripRequest.findAll({
      where: {
        ...queryParameters,
        ownerId: user.id,
      },
      include: tripInclude,
      attributes: tripAttributes,
    });
  }

  const filterdTrips = trips.filter((trip) => {
    let valid = true;
    if (locations.destination) {
      let inDestination = false;
      trip.destinations.forEach((destination) => {
        Object.keys(destination.dataValues).forEach((key) => {
          let value = destination.dataValues[key];
          typeof value === "string" ? (value = value.toLowerCase().trim()) : "";

          if (value == locations.destination.toLowerCase().trim()) {
            inDestination = true;
          }
        });
      });

      !inDestination ? (valid = false) : "";
    }

    if (locations.departure) {
      let inDeparture = false;
      Object.keys(trip.departure.dataValues).forEach((key) => {
        let value = trip.departure.dataValues[key];
        typeof value === "string" ? (value = value.toLowerCase().trim()) : "";

        if (value == locations.departure.toLowerCase().trim()) {
          inDeparture = true;
        }
      });

      !inDeparture ? (valid = false) : "";
    }

    return valid;
  });
  return filterdTrips;
};
export const addDestination = async (tripId, destinationId) => {
  const destination = await TripRequestDestination.create({
    tripId,
    destinationId,
  });
  return destination;
};
export const editDestination = async (tripId, destinationIds) => {
  await TripRequestDestination.destroy({ where: { tripId } });
  destinationIds.forEach(
    async (destinationId) => await addDestination(tripId, destinationId)
  );
};
