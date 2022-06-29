import express from "express";
import errorResponse from "../utils/error";
import successResponse from "../utils/success";
import AccommodationService from "../services/accommodation";
import { locationServices } from "../services";

const accommodationController = {};
accommodationController.getAll = async (req, res) => {
  
  let result = await AccommodationService.getAll();
  result = JSON.parse(JSON.stringify(result));
  for(let i = 0; i<result.length ; i++){
  //   result[i].accommodationImages= await AccommodationService.getAllImages(result[i].id,"AccommodationImage");
    result[i].rooms= await AccommodationService.getAllRooms(result[i].id);
  //   result[i].addOnServices= await AccommodationService.getAllAddOnServices(result[i].id);
  //   result[i].rooms= await AccommodationService.getAllAmenities(result[i].id);
  }
  return successResponse(res, 200, "Accommodation facilities querried from the DB successfully", result);;
};

accommodationController.getOne = async (req, res) => {
  const accommodationId = req.params.id;
  let result = await AccommodationService.getOne(accommodationId);
  if(!(result)){
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  result = JSON.parse(JSON.stringify(result));
  // result.accommodationImages= await AccommodationService.getAllImages(result.id,"AccommodationImage");
  result.rooms= await AccommodationService.getAllRooms(result.id);
  // for(let i = 0; i<result.rooms.length ; i++){
  //   result.rooms[i].images= await AccommodationService.getAllImages(result.rooms[i].id,"AccommodationRoomImage");
  // }
  // result.addOnServices= await AccommodationService.getAllAddOnServices(result.id);
  // result.rooms= await AccommodationService.getAllAmenities(result.id);
  return successResponse(res, 200, "Accommodation facility querried from the DB successfully", result);
};

accommodationController.createOne = async (req, res) => {
  try{
    const location = await locationServices.getOneLocation(req.body.location_id);
    if(!location){
      return errorResponse(res, 404, "location_id not found!");
    }
  }
  catch(err){
    return errorResponse(res, 404, "location_id not found!");
  }
  
  let result = await AccommodationService.createOne(req.body);
  result = JSON.parse(JSON.stringify(result));
  return successResponse(res, 201, "Accommodation facility created successfully", result);;
};

accommodationController.overwriteOne = async (req, res) => {
  const facility = await AccommodationService.getOne(req.params.id);
  if(!(facility)){
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  try{
    const location = await locationServices.getOneLocation(req.body.location_id);
    if(!location){
      return errorResponse(res, 404, "location_id not found!");
    }
  }
  catch(err){
    return errorResponse(res, 404, "location_id not found!");
  }
  
  let result = await AccommodationService.updateOne(req.params.id,req.body);
  result = JSON.parse(JSON.stringify(result));
  // result.accommodation_image_details = await AccommodationService.createOneImage({
  //   accommodation_id: result.id,
  //   link: req.body.accommodation_image_link,
  // },"AccommodationImage");
  return successResponse(res, 201, "Accommodation facility overwritten successfully", result);;
};

accommodationController.updateOne = async (req, res) => {
  
  let facility = await AccommodationService.getOne(req.params.id);
  if(!(facility)){
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  facility = JSON.parse(JSON.stringify(facility));
  if(req.body.name){
    facility.name =req.body.name;
  }
  if(req.body.description){
    facility.description =req.body.description;
  }
  if(req.body.location_id){
    try{
      const location = await locationServices.getOneLocation(req.body.location_id);
      if(!location){
        return errorResponse(res, 404, "location_id not found!");
      }
    }
    catch(err){
      return errorResponse(res, 404, "location_id not found!");
    }
    facility.location_id = req.body.location_id;
  }
  if(req.body.latitude){
    facility.latitude =req.body.latitude;
  }
  if(req.body.longitude){
    facility.longitude =req.body.longitude;
  }
  if(req.body.image_link){
    facility.images_links.push(req.body.image_link);
  }
  if(req.body.add_on_service){
    facility.add_on_services.push(req.body.add_on_service);
  }
  if(req.body.amenity){
    facility.amenities.push(req.body.amenity);
  }

  let result = await AccommodationService.updateOne(req.params.id,facility);
  result = JSON.parse(JSON.stringify(result));
  return successResponse(res, 201, "Accommodation facility updated successfully", result);;
};

accommodationController.deleteOne = async (req, res) => {
  const facility = await AccommodationService.getOne(req.params.id);
  if(!(facility)){
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  const result = await AccommodationService.deleteOne(req.params.id);
  return successResponse(res, 200, "Accommodation facility deleted successfully", result);;
};


//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

accommodationController.getAllRooms = async (req, res) => {
  const accommodationId = req.params.id;
  let result = await AccommodationService.getAllRooms(accommodationId);
  result = JSON.parse(JSON.stringify(result));
  return successResponse(res, 200, "Rooms querried from the DB successfully", result);;
};

accommodationController.createOneRoom = async (req, res) => {
  const accommodationId = req.params.id;
  let facility = await AccommodationService.getOne(accommodationId);
  if(!(facility)){
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  req.body.accomodation_id = accommodationId;
  let result = await AccommodationService.createOneRoom(req.body);
  result = JSON.parse(JSON.stringify(result));
  return successResponse(res, 200, "Room created in the DB successfully", result);;
};

accommodationController.overwriteOneRoom = async (req, res) => {
  let facility_url = await AccommodationService.getOne(req.params.id);
  if(!(facility_url)){
    return errorResponse(res, 404, "Accommodation facility (provided in the URL) not found!");
  }
  const facility = await AccommodationService.getOne(req.body.accommodation_id);
  if(!(facility)){
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  let room = await AccommodationService.getOneRoom(req.params.roomId);
  if(!(room)){
    return errorResponse(res, 404, "Room not found!");
  }
  let result = await AccommodationService.updateOneRoom(req.params.id,req.body);
  result = JSON.parse(JSON.stringify(result));
  return successResponse(res, 201, "Room entry overwritten successfully", result);;
};

accommodationController.updateOneRoom = async (req, res) => {
  
  let facility_url = await AccommodationService.getOne(req.params.id);
  if(!(facility_url)){
    return errorResponse(res, 404, "Accommodation facility (provided in the URL) not found!");
  }
  let room = await AccommodationService.getOneRoom(req.params.roomId);
  if(!(room)){
    return errorResponse(res, 404, "Room not found!");
  }
  room = JSON.parse(JSON.stringify(room));
  if(req.body.accommodation_id){
    const facility = await AccommodationService.getOne(req.body.accommodation_id);
    if(!(facility)){
      return errorResponse(res, 404, "Accommodation facility not found!");
    }
    room.accommodation_id = req.body.accommodation_id;
  }
  
  if(req.body.bed_type){
    room.bed_type =req.body.bed_type;
  }
  if(req.body.cost){
    room.cost =req.body.cost;
  }
  if(req.body.image_link){
    room.images_links.push(req.body.image_link);
  }
  let result = await AccommodationService.updateOneRoom(req.params.roomId,room);
  result = JSON.parse(JSON.stringify(result));
  return successResponse(res, 201, "Room entry updated successfully", result);;
};

accommodationController.deleteOneRoom = async (req, res) => {
  const facility = await AccommodationService.getOne(req.params.id);
  if(!(facility)){
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  let room = await AccommodationService.getOneRoom(req.params.roomId);
  if(!(room)){
    return errorResponse(res, 404, "Room not found!");
  }
  const result = await AccommodationService.deleteOneRoom(req.params.roomId);
  return successResponse(res, 200, "Accommodation facility deleted successfully", result);;
};

export default accommodationController;