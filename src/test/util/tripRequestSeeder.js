import models from "../../database/models";
const { TripRequest } = { ...models };

const tripRequestSeeder = async (userId, managerId) => {
  try {
    const tripRequests = TripRequest.bulkCreate([
      {
        id: 1,
        departureId: 1,
        travel_reason: "Studying my bachelor degree",
        accommodationId: 1,
        dateOfDeparture: "2022-07-17",
        dateOfReturn: null,
        status: "pending",
        tripType: "oneway",
        ownerId: userId,
        managerId: managerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        departureId: 1,        
        travel_reason: "Tourism",
        accommodationId: 1,
        dateOfDeparture: "2022-07-17",
        dateOfReturn: "2022-07-27",
        status: "pending",
        tripType: "return",
        ownerId: userId,
        managerId: managerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        departureId: 1,
                travel_reason: "Tourism",
        accommodationId: 1,
        dateOfDeparture: "2022-07-17",
        dateOfReturn: "2022-07-27",
        status: "approved",
        tripType: "return",
        ownerId: userId,
        managerId: managerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    return tripRequests;
  } catch (error) {
    console.error(error);
  }
};

export default tripRequestSeeder;
