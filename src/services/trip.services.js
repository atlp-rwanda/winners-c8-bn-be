import Db from "../database/models";
import RoleService from "./roleServices";

const { findRoleById } = RoleService;

const TripRequest = Db.TripRequest;

export const getAllTripRequests = async (user) => {
  let result;

  if ((await findRoleById(user.user_role)).roleName == "manager") {
    result = await TripRequest.findAll({
      where: {
        managerId: user.id,
      },
      include: [
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
      ],
    });
  } else {
    result = await TripRequest.findAll({
      where: {
        ownerId: user.id,
      },
      include: [
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
      ],
    });
  }

  return result;
};

export const getOneTripRequest = async (user, tripId) => {
  const result = await TripRequest.findOne({
    where: {
      id: tripId,
    },
    include: [
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
    ],
  });

  if (result == null) {
    throw new Error("notFound");
  }

  if (
    (await findRoleById(user.user_role)).roleName == "manager" &&
    result.managerId != user.id
  ) {
    throw new Error("manager");
  }

  if (
    (await findRoleById(user.user_role)).roleName == "requester" &&
    result.ownerId != user.id
  ) {
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
