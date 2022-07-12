import Swal from "sweetalert2";

import services from "services";
import { AddressData, AddressType, Coordinates } from "models";
import {
  Action,
  Dispatch,
  SET_FROM_ADDRESS_DATA,
  SET_FROM_COORDINATES,
  SET_IS_LOADING,
  SET_TO_ADDRESS_DATA,
  SET_TO_COORDINATES,
} from "./appTypes";

export const setFromAddressData = (fromAddressData: AddressData): Action => ({
  type: SET_FROM_ADDRESS_DATA,
  fromAddressData,
});

export const setToAddressData = (toAddressData: AddressData): Action => ({
  type: SET_TO_ADDRESS_DATA,
  toAddressData,
});

export const setFromCoordinates = (
  fromCoordinates: Partial<Coordinates>,
): Action => ({
  type: SET_FROM_COORDINATES,
  fromCoordinates,
});

export const setToCoordinates = (
  toCoordinates: Partial<Coordinates>,
): Action => ({
  type: SET_TO_COORDINATES,
  toCoordinates,
});

export const setIsLoading = (loading: boolean): Action => ({
  type: SET_IS_LOADING,
  loading,
});

export const getAddressCoordinates = async (
  type: AddressType,
  addressData: AddressData,
  dispatch: Dispatch,
): Promise<void> => {
  try {
    dispatch(setIsLoading(true));
    const response = await services.getLocationRequest(addressData);
    const address = response.data[0];
    if (!address) {
      const errorMessage =
        "There was no address found. Please try it again with a more specific address";
      if (type === "from") {
        return dispatch(setFromCoordinates({ error: true, errorMessage }));
      } else {
        return dispatch(setToCoordinates({ error: true, errorMessage }));
      }
    }
    const coordinatesData: Coordinates = {
      latitude: Number(address.lat),
      longitude: Number(address.lon),
      addressName: address.display_name,
      error: false,
      errorMessage: "",
    };
    if (type === "from") {
      return dispatch(setFromCoordinates({ ...coordinatesData }));
    } else {
      return dispatch(setToCoordinates({ ...coordinatesData }));
    }
  } catch {
    Swal.fire("Something went wrong", "Please try it again", "error");
    const errorMessage = "Something went wrong. Please try it again";
    if (type === "from") {
      return dispatch(setFromCoordinates({ error: true, errorMessage }));
    } else {
      return dispatch(setToCoordinates({ error: true, errorMessage }));
    }
  } finally {
    dispatch(setIsLoading(false));
  }
};
