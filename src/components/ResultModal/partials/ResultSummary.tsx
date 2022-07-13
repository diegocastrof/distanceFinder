import React from "react";
import { useApp } from "context/appContext";
import { getDistanceFromLatLonInKm } from "utils";

const ResultSummary = () => {
  const { state } = useApp();

  if (state.fromCoordinates.error || state.toCoordinates.error) {
    return <p>We couldn't find the distance. Sorry</p>;
  }

  const calculatedDistance = getDistanceFromLatLonInKm(
    state.fromCoordinates?.latitude as number,
    state.fromCoordinates?.longitude as number,
    state.toCoordinates?.latitude as number,
    state.toCoordinates?.longitude as number,
  );

  return (
    <p className="font-bold text-xl text-gray-600 text-center my-5">
      The distance is {calculatedDistance.toFixed(2)} km
    </p>
  );
};

export default ResultSummary;
