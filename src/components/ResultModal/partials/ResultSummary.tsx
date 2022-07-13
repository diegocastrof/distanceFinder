import React, { FC } from "react";
import { useApp } from "context/appContext";

interface Props {
  calculatedDistance: number;
}

const ResultSummary: FC<Props> = ({ calculatedDistance }) => {
  const { state } = useApp();

  if (state.fromCoordinates.error || state.toCoordinates.error) {
    return <p>We couldn't find the distance. Sorry</p>;
  }

  return (
    <p className="font-bold text-xl text-gray-600 text-center my-5">
      The distance is {calculatedDistance.toFixed(2)} km
    </p>
  );
};

export default ResultSummary;
