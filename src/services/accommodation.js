// import { Accommodation, AccommodationImage, AccommodationRoom , AccommodationAddOnService , AccommodationAmenity, AccommodationRoomImage } from "../database/models";
import { Accommodation, AccommodationRoom } from "../database/models";


class AccommodationService {
  static async createOne(data) {
    const accommodationFacility = await Accommodation.create(data);
    return accommodationFacility;
  }

  static getOne = async (id) => {
    const accommodationFacility = await Accommodation.findOne({ where: { id } });
    return accommodationFacility;
  };

  static getAll = async () => {
    const accommodationFacilities = await Accommodation.findAll();
    return accommodationFacilities;
  };

  static updateOne = async (id,inputData) => {
    const data = await Accommodation.update(
      {
        ...inputData
      },
      {
        where: { id },
      }
    );
    return data;
  };

  static deleteOne = async (id) => {
    const data = await Accommodation.destroy({ where: { id } });
    return data;
  }


  static async createOneRoom(data) {
    const outputData = await AccommodationRoom.create(data);
    return outputData;
  }

  static getOneRoom = async (id) => {
    const outputData = AccommodationRoom.findOne({ where: { id } });
    return outputData;
  };

  static getAllRooms = async (id) => {
    const outputData = AccommodationRoom.findAll({ where: { accommodation_id : id } });
    return outputData;
  };

  static updateOneRoom = async (id,inputData) => {
    const data = await AccommodationRoom.update(
      {
        ...inputData
      },
      {
        where: { id },
      }
    );
    return data;
  };

  static deleteOneRoom = async (id) => {
    const data = await AccommodationRoom.destroy({ where: { id } });
    return data;
  }

  // static async createOneImage(data,modelName) {
  //   let outputData ={}
  //   if(modelName=="AccommodationRoomImage"){ 
  //     outputData = await AccommodationRoomImage.create(data);
  //   }
  //   if(modelName=="AccommodationImage"){ 
  //     outputData = await AccommodationImage.create(data);
  //   }
  //   return outputData;
  // }

  // static getAllImages = async (id,modelName) => {
  //   let outputData ={}
  //   if(modelName=="AccommodationRoomImage"){ 
  //     outputData = await AccommodationRoomImage.findAll({ where: { room_id : id } });
  //   }
  //   if(modelName=="AccommodationImage"){ 
  //     outputData = await AccommodationImage.findAll({ where: { accommodation_id : id } });
  //   }
  //   return outputData;
  // };

  // static async createOneAddOnService(data) {
  //   const outputData = await AccommodationAddOnService.create(data);
  //   return outputData;
  // }

  // static getAllAddOnServices = async (id) => {
  //   const outputData = AccommodationAddOnService.findAll({ where: { accommodation_id : id } });
  //   return outputData;
  // };

  // static async createOneAmenity(data) {
  //   const outputData = await AccommodationAmenity.create(data);
  //   return outputData;
  // }

  // static getAllAmenities = async (id) => {
  //   const outputData = AccommodationAmenity.findAll({ where: { accommodation_id : id } });
  //   return outputData;
  // };
}

export default AccommodationService;
