// import { where } from "sequelize/types";
import { group } from "console";
import Models, { sequelize }  from "../database/models";
import triprequestdestinations from "../database/models/triprequestdestinations";
const { Location, TripRequestDestination,TripRequest} = Models;

export const getAllLocations = async () => {
  const locations = Location.findAll();

  return locations;
};

export const getOneLocation = async (locationId) => {
  const location = await Location.findOne({ where: { id: locationId } });

  if (location == null) {
    throw new Error("notFound");
  }

  return location;
};

export const postLocation = async (locationData) => {
  const location = await Location.create({ ...locationData });

  return location;
};

export const updateLocation = async (locationId, locationData) => {
  const locationToUpdate = await Location.findOne({
    where: {
      id: locationId,
    },
  });



  if (!locationToUpdate) {
    throw new Error("notFound");
  }
  if (!locationData.state) locationData.state = null;
  if (!locationData.province) locationData.province = null;
  locationData.id = locationToUpdate.id;
  locationData.createdAt = locationToUpdate.createdAt;
  locationData.updatedAt = new Date();

  const location = await Location.upsert(locationData);

  return location;
};

export const deleteLocation = async (locationId) => {
  const locationToDelete = await Location.findOne({
    where: { id: locationId },
  });

  if (locationToDelete == null) {
    throw new Error("notFound");
  }

  const location = await Location.destroy({ where: { id: locationId } });

  return location;
};

export const checkLocation = async (locationId) => {
  const location = await Location.findOne({ where: { id: locationId } });

  if (location == null) {
    return false;
  }

  return true;
};

export const getAllDestinationStats = async (tripId) => {
// try{   
    const statistics =  await TripRequest.count({
      id: tripId
    })
      // {
      //   attibutes: [
      //     'destinationId',
      //     [sequelize.fn('COUNT', sequelize.col('TripRequestDestination.destinationId')), 'destinationId']
      //   ],
      //   group: ['TripRequestDestination.destionationId'],
      //   limit: 3,
      // })
  return {statistics};

// } catch(err)  {
// return err
// }
}
