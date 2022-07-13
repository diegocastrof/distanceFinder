import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AddressInput from "components/AddressInput/AddressInput";
import { useApp } from "context/appContext";
import validationSchema from "./validationSchema";
import { AddressData, MainFormData } from "models";
import "./MainFormStyles.css";
import {
  getAddressCoordinates,
  setFromAddressData,
  setToAddressData,
} from "context/appActions";

interface Props {
  openModal: () => void;
}

const MainForm: FC<Props> = ({ openModal }) => {
  const { state, dispatch } = useApp();

  const methods = useForm<MainFormData>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: MainFormData): Promise<void> => {
    const fromAddressData: AddressData = {
      street: data.fromStreet,
      city: data.fromCity,
      country: data.fromCountry,
    };
    const toAddressData: AddressData = {
      street: data.toStreet,
      city: data.toCity,
      country: data.toCountry,
    };
    dispatch(setFromAddressData(fromAddressData));
    dispatch(setToAddressData(toAddressData));
    getAddressCoordinates("from", fromAddressData, dispatch);
    getAddressCoordinates("to", toAddressData, dispatch);
    openModal();
  };

  const handleReset = () => reset();

  useEffect(handleReset, [state.resetForm, reset]);

  return (
    <FormProvider {...methods}>
      <form className="form-root" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl font-bold text-red-600 mb-3">
          Select start address
        </h3>
        <AddressInput
          id="fromStreet"
          label="Street"
          placeholder="My addresss #123"
          defaultValue=""
        />
        <AddressInput
          id="fromCity"
          label="City"
          placeholder="Santiago"
          defaultValue=""
        />
        <AddressInput
          id="fromCountry"
          label="Country"
          placeholder="Chile"
          defaultValue=""
        />
        <h3 className="text-xl font-bold text-red-600 mb-3">
          Select target address
        </h3>
        <AddressInput
          id="toStreet"
          label="Street"
          placeholder="My addresss #123"
          defaultValue=""
        />
        <AddressInput
          id="toCity"
          label="City"
          placeholder="Santiago"
          defaultValue=""
        />
        <AddressInput
          id="toCountry"
          label="Country"
          placeholder="Chile"
          defaultValue=""
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default MainForm;
