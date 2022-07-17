import moment from "moment";
export const noDepartureTripRequest = () => {
  return {
    destinationsId: [1, 2],
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: moment().add(1, "day").format("YYYY-MM-DD"),
    dateOfReturn: null,
  };
};

export const fullTripRequest = () => {
  return {
    departureId: 2,
    destinationsId: [1, 2],
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: moment().add(1, "day").format("YYYY-MM-DD"),
    dateOfReturn: moment().add(4, "day").format("YYYY-MM-DD"),
  };
};

export const ownedTrip = 
{
		departureId: 2,
		destinationId: 3,
		travelReason: 'Studying my bachelor degree',
		accommodationId: 1,
		dateOfDeparture: '2022-07-17',
		dateOfReturn: '2022-07-27',
    travel_reason: 'Studying my bachelor degree',
    tripType: 'oneway',
    ownerId: '7adae2f1-4d35-470d-8512-1b9634330a9e',
    managerId: '6927442b-84fb-4fc3-b799-11449fa62f52',
  };

export const oneWayTripRequest = () => {
  return {
    departureId: 2,
    destinationsId: [3, 2],
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: moment().add(1, "day").format("YYYY-MM-DD").toString(),
  };
};
