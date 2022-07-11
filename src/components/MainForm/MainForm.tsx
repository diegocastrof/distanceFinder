import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AddressInput from "components/AddressInput/AddressInput";
import getAddressCoordinates from "actions/getAddressCoordinates";
import validationSchema from "./validationSchema";
import { AddressData, MainFormData } from "models";
import "./MainFormStyles.css";

function App() {
  const methods = useForm<MainFormData>({
    resolver: yupResolver(validationSchema),
  });
  const { handleSubmit } = methods;

  // console.log(errors);

  const onSubmit = async (data: MainFormData) => {
    const addressData: AddressData = {
      street: data.fromStreet,
      city: data.fromCity,
      country: data.fromCountry,
    };
    const response = await getAddressCoordinates(addressData);
    console.log(response);
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
}

export default App;
