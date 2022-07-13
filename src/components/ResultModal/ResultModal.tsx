import { FC } from "react";
import { AddressSummary, ResultSummary } from "./partials";
import { useApp } from "context/appContext";
import { resetForm } from "context/appActions";
import { db } from "config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "./ResultModaStyles.css";
import { getDistanceFromLatLonInKm } from "utils";
import Swal from "sweetalert2";

interface Props {
  closeModal: () => void;
}

const ResultModal: FC<Props> = ({ closeModal }) => {
  const { state, dispatch } = useApp();

  const handleResetFormValues = () => {
    dispatch(resetForm());
    closeModal();
  };

  const calculatedDistance = getDistanceFromLatLonInKm(
    state.fromCoordinates?.latitude as number,
    state.fromCoordinates?.longitude as number,
    state.toCoordinates?.latitude as number,
    state.toCoordinates?.longitude as number,
  );

  const handleSaveResults = async () => {
    try {
      await addDoc(collection(db, "trips"), {
        fromAddressName: state.fromCoordinates.addressName,
        fromAddressLatitude: state.fromCoordinates.latitude,
        fromAddressLongitude: state.fromCoordinates.longitude,
        toAddressName: state.toCoordinates.addressName,
        toAddressLatitude: state.toCoordinates.latitude,
        toAddressLongitude: state.toCoordinates.longitude,
        distance: calculatedDistance,
        created: Timestamp.now(),
      });
      await Swal.fire(
        "All good!",
        "Your results were saved successfully",
        "success",
      );
      dispatch(resetForm());
      closeModal();
    } catch (err) {
      Swal.fire(
        "Something went wrong",
        "Your results were not saved. Please try it again",
        "error",
      );
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
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
            <AddressSummary addressType="from" />
            <AddressSummary addressType="to" />
            <ResultSummary calculatedDistance={calculatedDistance} />
          </>
        )}
      </div>
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          onClick={handleResetFormValues}
        >
          Reset Form Values
        </button>
        {!(state.fromCoordinates.error || state.toCoordinates.error) && (
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            onClick={handleSaveResults}
          >
            Save results
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultModal;
