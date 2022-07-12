import { FC } from "react";
import { useApp } from "context/appContext";

import { getDistanceFromLatLonInKm } from "utils";
import "./ResultModaStyles.css";

interface Props {
  closeModal: () => void;
}

const ResultModal: FC<Props> = ({ closeModal }) => {
  const { state } = useApp();

  return (
    <div className="result-modal-root">
      <div className="result-modal--header">
        <h2 className="text-3xl font-bold text-red-600 mb-3">Results</h2>
        <button className="close-btn" onClick={closeModal}>
          x
        </button>
      </div>
      <div className="result-modal--body">
        {state.loading ? (
          <p>Calculating results...</p>
        ) : (
          <>
            {state.fromCoordinates.error ? (
              <p>{state.fromCoordinates.errorMessage}</p>
            ) : (
              <p>Initial address: {state.fromCoordinates?.addressName}</p>
            )}

            {state.toCoordinates.error ? (
              <p>{state.toCoordinates.errorMessage}</p>
            ) : (
              <p>Target address: {state.toCoordinates?.addressName}</p>
            )}
            {state.fromCoordinates.error || state.toCoordinates.error ? (
              <p>We couldn't find the distance. Sorry</p>
            ) : (
              <p>
                The distance is{" "}
                {getDistanceFromLatLonInKm(
                  state.fromCoordinates?.latitude as number,
                  state.fromCoordinates?.longitude as number,
                  state.toCoordinates?.latitude as number,
                  state.toCoordinates?.longitude as number,
                )}{" "}
                km
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResultModal;
