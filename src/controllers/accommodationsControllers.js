import express from "express";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import AccommodationService from "../services/accommodation";
import { locationServices } from "../services";

const accommodationController = {};
accommodationController.getAll = async (req, res) => {
  let result = await AccommodationService.getAll();
  result = JSON.parse(JSON.stringify(result));

  result.forEach((accommodation) => {
    accommodation.usersLiked.forEach((user) => {
      if (user.id === req.user.id) {
        accommodation.isLiked = true;
      }
    });
    if (!accommodation.isLiked) {
      accommodation.isLiked = false;
    }

    accommodation.likes = accommodation.usersLiked.length;

    delete accommodation.usersLiked;
  });

  for (let i = 0; i < result.length; i++) {
    result[i].rooms = await AccommodationService.getAllRooms(result[i].id);
  }
  return successResponse(
    res,
    200,
    "Accommodations querried successfully",
    result
  );
};

accommodationController.getOne = async (req, res) => {
  const accommodationId = req.params.id;
  let result = await AccommodationService.getOne(accommodationId);
  if (!result) {
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  result = JSON.parse(JSON.stringify(result));
  result.usersLiked.forEach((user) => {
    if (user.id === req.user.id) {
      result.isLiked = true;
    }
  });

  if (!result.isLiked) {
    result.isLiked = false;
  }

  result.likes = result.usersLiked.length;

  delete result.usersLiked;

  result.rooms = await AccommodationService.getAllRooms(result.id);
  return successResponse(
    res,
    200,
    "Accommodation facility querried successfully",
    result
  );
};

accommodationController.createOne = async (req, res) => {
  try {
    const location = await locationServices.getOneLocation(
      req.body.location_id
    );
  } catch (err) {
    return errorResponse(res, 404, "location_id not found!");
  }

  let result = await AccommodationService.createOne(req.body);
  result = JSON.parse(JSON.stringify(result));
  return successResponse(
    res,
    201,
    "Accommodation facility created successfully",
    result
  );
};

accommodationController.updateOne = async (req, res) => {
  let facility = await AccommodationService.getOne(req.params.id);
  if (!facility) {
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  facility = JSON.parse(JSON.stringify(facility));
  if (req.body.name) {
    facility.name = req.body.name;
  }
  if (req.body.description) {
    facility.description = req.body.description;
  }
  if (req.body.location_id) {
    try {
      const location = await locationServices.getOneLocation(
        req.body.location_id
      );
    } catch (err) {
      return errorResponse(res, 404, "location_id not found!");
    }
    facility.location_id = req.body.location_id;
  }
  if (req.body.latitude) {
    facility.latitude = req.body.latitude;
  }
  if (req.body.longitude) {
    facility.longitude = req.body.longitude;
  }
  if (req.body.image_link) {
    facility.images_links.push(req.body.image_link);
  }
  if (req.body.images_links) {
    facility.images_links = req.body.images_links;
  }
  if (req.body.add_on_services) {
    facility.add_on_services = req.body.add_on_services;
  }
  if (req.body.amenities) {
    facility.amenities = req.body.amenities;
  }

  let result = await AccommodationService.updateOne(req.params.id, facility);
  result = JSON.parse(JSON.stringify(result));
  return successResponse(
    res,
    201,
    "Accommodation facility updated successfully",
    result
  );
};

accommodationController.deleteOne = async (req, res) => {
  const facility = await AccommodationService.getOne(req.params.id);
  if (!facility) {
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  const result = await AccommodationService.deleteOne(req.params.id);
  const roomDeletion = await AccommodationService.deleteAllRooms(req.params.id);
  return successResponse(
    res,
    200,
    "Accommodation facility deleted successfully",
    { accommodation_deletions: result, room_deletions: roomDeletion }
  );
};

accommodationController.likeOrDislike = async (req, res) => {
  const accommodationId = req.params.id;
  try {
    const message = await AccommodationService.likeOrDislike(
      req.user,
      accommodationId
    );
    switch (message) {
      case "notRequester":
        return errorResponse(
          res,
          403,
          "Only requesters are allowed to like or dislike an accommodation"
        );
      case "disliked":
        return successResponse(res, 200, "Accommodation has been disliked");
      case "liked":
        return successResponse(res, 200, "Accommodation has been liked");
    }
  } catch (err) {
    return errorResponse(res, 404, err.message);
  }
};

//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

accommodationController.getAllRooms = async (req, res) => {
  const accommodationId = req.params.id;
  let result = await AccommodationService.getAllRooms(accommodationId);
  result = JSON.parse(JSON.stringify(result));
  return successResponse(
    res,
    200,
    "Rooms querried from the DB successfully",
    result
  );
};

accommodationController.createOneRoom = async (req, res) => {
  const accommodationId = req.params.id;
  let facility = await AccommodationService.getOne(accommodationId);
  if (!facility) {
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  req.body.accommodation_id = accommodationId;
  let result = await AccommodationService.createOneRoom(req.body);
  result = JSON.parse(JSON.stringify(result));
  return successResponse(
    res,
    201,
    "Room created in the DB successfully",
    result
  );
};

accommodationController.updateOneRoom = async (req, res) => {
  let room = await AccommodationService.getOneRoom(
    req.params.id,
    req.params.roomId
  );
  if (!room) {
    return errorResponse(
      res,
      404,
      `Room with id = ${req.params.roomId} from accommodation facility of id = ${req.params.id}  not found!`
    );
  }
  room = JSON.parse(JSON.stringify(room));
  if (req.body.accommodation_id) {
    const facility = await AccommodationService.getOne(
      req.body.accommodation_id
    );
    if (!facility) {
      return errorResponse(res, 404, "Accommodation facility not found!");
    }
    room.accommodation_id = req.body.accommodation_id;
  }

  if (req.body.bed_type) {
    room.bed_type = req.body.bed_type;
  }
  if (req.body.cost) {
    room.cost = req.body.cost;
  }
  if (req.body.image_link) {
    room.images_links.push(req.body.image_link);
  }
  if (req.body.images_links) {
    room.images_links = req.body.images_links;
  }
  let result = await AccommodationService.updateOneRoom(
    req.params.id,
    req.params.roomId,
    room
  );
  result = JSON.parse(JSON.stringify(result));
  return successResponse(res, 201, "Room entry updated successfully", result);
};

accommodationController.deleteOneRoom = async (req, res) => {
  let room = await AccommodationService.getOneRoom(
    req.params.id,
    req.params.roomId
  );
  if (!room) {
    return errorResponse(
      res,
      404,
      `Room with id = ${req.params.roomId} from accommodation facility of id = ${req.params.id}  not found!`
    );
  }
  const result = await AccommodationService.deleteOneRoom(
    req.params.id,
    req.params.roomId
  );
  return successResponse(res, 200, "Room deleted successfully", result);
};

export default accommodationController;
