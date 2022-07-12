import { FC, useEffect, useState } from "react";
import { AddressData, Coordinates } from "models";
import "./ResultModaStyles.css";
import getAddressCoordinates from "actions/getAddressCoordinates";
import { getDistanceFromLatLonInKm } from "utils";

interface Props {
  fromAddressData: AddressData;
  toAddressData: AddressData;
  closeModal: () => void;
}

const ResultModal: FC<Props> = ({
  fromAddressData,
  toAddressData,
  closeModal,
}) => {
  const [loadingResults, setLoadingResults] = useState(false);
  const [fromAddressCoordinates, setFromAddressCoordinates] =
    useState<Coordinates | null>(null);
  const [toAddressCoordinates, setToAddressCoordinates] =
    useState<Coordinates | null>(null);

  useEffect(() => {
    console.log(fromAddressData, toAddressData, "running...");

    if (!fromAddressData || !toAddressData) return;

    const handleOnMount = async () => {
      setLoadingResults(true);
      const fromAddressCoordinatesResponse = await getAddressCoordinates(
        fromAddressData as AddressData,
      );
      const toAddressCoordinatesResponse = await getAddressCoordinates(
        toAddressData as AddressData,
      );
      setFromAddressCoordinates(fromAddressCoordinatesResponse);
      setToAddressCoordinates(toAddressCoordinatesResponse);
      setLoadingResults(false);
    };

    handleOnMount();
  }, [fromAddressData, toAddressData]);

  return (
    <div className="result-modal-root">
      <div className="result-modal--header">
        <h2 className="text-3xl font-bold text-red-600 mb-3">Results</h2>
        <button className="close-btn" onClick={closeModal}>
          x
        </button>
      </div>
      <div className="result-modal--body">
        {loadingResults ? (
          <p>Calculating results...</p>
        ) : (
          <>
            <p>Initial address: {fromAddressCoordinates?.addressName}</p>
            <p>Target address: {toAddressCoordinates?.addressName}</p>

            <p>
              The distance is{" "}
              {getDistanceFromLatLonInKm(
                fromAddressCoordinates?.latitude as number,
                fromAddressCoordinates?.longitude as number,
                toAddressCoordinates?.latitude as number,
                toAddressCoordinates?.longitude as number,
              )}{" "}
              km
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultModal;
