import Db from "../database/models";

const TripRequest = Db.TripRequest;

export const getAllTripRequests = async (user) => {
  let result;

  if (user.user_role == "manager") {
    result = await TripRequest.findAll({
      where: {
        managerId: user.id,
      },
    });
  } else {
    result = await TripRequest.findAll({
      where: {
        ownerId: user.id,
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
  }

  if (user.user_role == "manager" && result.managerId != user.id) {
    throw new Error("manager");
  }

  if (user.user_role == "requester" && result.ownerId != user.id) {
    throw new Error("owner");
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
