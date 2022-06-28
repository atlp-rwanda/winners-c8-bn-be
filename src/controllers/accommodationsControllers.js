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
    result[i].accommodationImages= await AccommodationService.getAllImages(result[i].id,"AccommodationImage");
    result[i].rooms= await AccommodationService.getAllRooms(result[i].id);
    result[i].addOnServices= await AccommodationService.getAllAddOnServices(result[i].id);
    result[i].rooms= await AccommodationService.getAllAmenities(result[i].id);
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
  result.accommodationImages= await AccommodationService.getAllImages(result.id,"AccommodationImage");
  result.rooms= await AccommodationService.getAllRooms(result.id);
  for(let i = 0; i<result.rooms.length ; i++){
    result.rooms[i].images= await AccommodationService.getAllImages(result.rooms[i].id,"AccommodationRoomImage");
  }
  result.addOnServices= await AccommodationService.getAllAddOnServices(result.id);
  result.rooms= await AccommodationService.getAllAmenities(result.id);
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
  result.accommodation_image_details = await AccommodationService.createOneImage({
    accommodation_id: result.id,
    link: req.body.accommodation_image_link,
  },"AccommodationImage");
  return successResponse(res, 201, "Accommodation facility created successfully", result);;
};

accommodationController.updateOne = async (req, res) => {
  
  const facility = await AccommodationService.getOne(req.params.id);
  if(!(facility)){
    return errorResponse(res, 404, "Accommodation facility not found!");
  }
  let result = {};
  if(req.body.accommodation_image_link){
    result.uploadedImage = await AccommodationService.createOneImage({
      accommodation_id: req.params.id,
      link: req.body.accommodation_image_link,
    },"AccommodationImage");
  }
  if(req.body.room){
    result.uploadedRoom = await AccommodationService.createOneRoom({
      accommodation_id: req.params.id,
      bed_type: req.body.room.bedType,
      cost: req.body.room.cost
    });
  }
  if(req.body.addOnService){
    result.uploadedAddOnService = await AccommodationService.createOneAddOnService({
      accommodation_id: req.params.id,
      name: req.body.addOnService.name,
      cost: req.body.addOnService.cost
    });
  }
  if(req.body.amenity){
    result.uploadedAddOnService = await AccommodationService.createOneAmenity({
      accommodation_id: req.params.id,
      name: req.body.amenity.name,
      cost: req.body.amenity.cost
    });
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
  let result2 = await AccommodationService.updateOne(req.params.id,req.body);
  result2 = JSON.parse(JSON.stringify(result2));
  result = { ...result2, ...result};
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

export default accommodationController;