import Swal from "sweetalert2";

import services from "services";
import { AddressData, Coordinates } from "models";

const getAddressCoordinates = async (
  addressData: AddressData,
): Promise<Coordinates | null> => {
  try {
    const response = await services.getLocationRequest(addressData);
    const address = response.data[0];
    return {
      latitude: Number(address.lat),
      longitude: Number(address.lon),
      addressName: address.display_name,
    };
  } catch (e) {
    Swal.fire("Something went wrong", "Please try it again", "error");
    return null;
  }
};

export default getAddressCoordinates;
