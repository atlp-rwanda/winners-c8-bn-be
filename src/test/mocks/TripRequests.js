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

export const oneWayTripRequest = () => {
  return {
    departureId: 2,
    destinationsId: [3, 2],
    travelReason: "Studying my bachelor degree",
    accommodationId: 1,
    dateOfDeparture: moment().add(1, "day").format("YYYY-MM-DD").toString(),
  };
};
