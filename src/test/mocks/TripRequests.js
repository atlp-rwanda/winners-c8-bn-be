export const noDepartureTripRequest = () => {
  return {
    destinationsId: [1, 2],
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
    dateOfReturn: null,
  };
};

export const fullTripRequest = () => {
  return {
    departureId: 2,
    destinationsId: [1, 2],
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
    dateOfReturn: "2022-07-27",
  };
};

export const oneWayTripRequest = () => {
  return {
    departureId: 2,
    destinationsId: [3, 2],
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
  };
};
