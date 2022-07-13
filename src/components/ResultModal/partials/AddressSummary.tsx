import React, { FC } from "react";
import { useApp } from "context/appContext";
import { AddressType } from "models";
import "./AddressSummaryStyles.css";

interface Props {
  addressType: AddressType;
}

const AddressSummary: FC<Props> = ({ addressType }) => {
  const { state } = useApp();

  const address =
    addressType === "from" ? state.fromCoordinates : state.toCoordinates;

  const title = addressType === "from" ? "Start address" : "Target address";

  return (
    <div className="mb-4">
      <p className="font-bold text-xl text-gray-600">{title}</p>
      {address.error ? (
        <p className="font-bold text-md text-red-500">{address.errorMessage}</p>
      ) : (
        <>
          <p className="text-sm italic mb-2">
            We have found the following address.
          </p>
          <p className="font-bold text-md text-red-500">
            {address?.addressName}
          </p>
        </>
      )}
    </div>
  );
};

export default AddressSummary;
