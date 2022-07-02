export const noDepartureTripRequest = () => {
  return {
    destinationId: 2,
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
    dateOfReturn: null,
  };
};

export const fullTripRequest = () => {
  return {
    departureId: 2,
    destinationId: 3,
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
    dateOfReturn: "2022-07-27",
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
    destinationId: 3,
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
  };
};
