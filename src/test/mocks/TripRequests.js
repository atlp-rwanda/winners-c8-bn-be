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

export const oneWayTripRequest = () => {
  return {
    departureId: 2,
    destinationId: 3,
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
  };
};
