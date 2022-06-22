export const noDepartureTripRequest = () => {
  return {
    destination: "toronto",
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
    dateOfReturn: null,
  };
};

export const fullTripRequest = () => {
  return {
    departure: "nairobi",
    destination: "toronto",
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: "2022-07-17",
    dateOfReturn: "2022-07-27",
  };
};
