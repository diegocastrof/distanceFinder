import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AddressInput from "components/AddressInput/AddressInput";
import validationSchema from "./validationSchema";
import { AddressData, MainFormData } from "models";
import "./MainFormStyles.css";

interface Props {
  setFromAddressData: React.Dispatch<React.SetStateAction<AddressData | null>>;
  setToAddressData: React.Dispatch<React.SetStateAction<AddressData | null>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainForm: FC<Props> = ({
  setFromAddressData,
  setToAddressData,
  setIsModalOpen,
}) => {
  const methods = useForm<MainFormData>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;

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
    setFromAddressData(fromAddressData);
    setToAddressData(toAddressData);
    setIsModalOpen(true);
  };

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
        />
        <AddressInput id="fromCity" label="City" placeholder="Santiago" />
        <AddressInput id="fromCountry" label="Country" placeholder="Chile" />
        <h3 className="text-xl font-bold text-red-600 mb-3">
          Select target address
        </h3>
        <AddressInput
          id="toStreet"
          label="Street"
          placeholder="My addresss #123"
        />
        <AddressInput id="toCity" label="City" placeholder="Santiago" />
        <AddressInput id="toCountry" label="Country" placeholder="Chile" />
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
