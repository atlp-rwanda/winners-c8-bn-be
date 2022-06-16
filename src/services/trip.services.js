import Db from "../database/models";

const TripRequest = Db.TripRequest;

export const getAllTripRequests = async (user) => {
  let result;

  if (user.role == "manager") {
    result = await TripRequest.findAll({
      where: {
        managerId: user.userId,
      },
    });
  } else {
    result = await TripRequest.findAll({
      where: {
        ownerId: user.userId,
      },
    });
  }

  return result;
};

export const getOneTripRequest = async (user, tripId) => {
  const result = await TripRequest.findOne({
    where: {
      id: tripId,
    },
  });

  if (result == null) {
    throw new Error("notFound");
    return;
  }

  if (user.role == "manager" && result.managerId != user.userId) {
    throw new Error("manager");
    return;
  }

  if (user.role == "requester" && result.ownerId != user.userId) {
    throw new Error("owner");
    return;
  }

  return result;
};

export const createTripRequest = async (tripRequest) => {
  const result = await TripRequest.create(tripRequest);

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
    return;
  }

  if (tripRequestToUpdate.status !== "pending") {
    throw new Error("status");
    return;
  }

  if (!(tripRequestToUpdate.ownerId === user.userId)) {
    throw new Error("owner");
    return;
  }

  tripRequest.id = tripRequestToUpdate.id;
  tripRequest.ownerId = tripRequestToUpdate.ownerId;
  tripRequest.managerId = tripRequestToUpdate.managerId;
  tripRequest.status = tripRequestToUpdate.status;
  tripRequest.updatedAt = new Date();

  const result = await TripRequest.upsert(tripRequest);

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
    return;
  }

  if (tripRequest.status !== "pending") {
    throw new Error("status");
    return;
  }

  if (!(tripRequest.ownerId === user.userId)) {
    throw new Error("owner");
    return;
  }

  const result = await TripRequest.destroy({
    where: {
      id: tripRequest.id,
    },
  });

  return result;
};
