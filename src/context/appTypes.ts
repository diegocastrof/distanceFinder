import { AddressData, Coordinates } from "models";

export type Dispatch = (action: Action) => void;

export const SET_FROM_ADDRESS_DATA = "SET_FROM_ADDRESS_DATA";
export const SET_TO_ADDRESS_DATA = "SET_TO_ADDRESS_DATA";
export const SET_FROM_COORDINATES = "SET_FROM_COORDINATES";
export const SET_TO_COORDINATES = "SET_TO_COORDINATES";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_ERROR = "SET_ERROR";
export const RESET_FORM = "RESET_FORM";

export interface State {
  fromAddressData: AddressData;
  toAddressData: AddressData;
  fromCoordinates: Coordinates;
  toCoordinates: Coordinates;
  loading: boolean;
  resetForm: boolean;
}

interface SetFromAddressData {
  type: typeof SET_FROM_ADDRESS_DATA;
  fromAddressData: AddressData;
}

interface SetToAddressData {
  type: typeof SET_TO_ADDRESS_DATA;
  toAddressData: AddressData;
}

interface SetFromCoordinates {
  type: typeof SET_FROM_COORDINATES;
  fromCoordinates: Partial<Coordinates>;
}

interface SetToCoordinates {
  type: typeof SET_TO_COORDINATES;
  toCoordinates: Partial<Coordinates>;
}

interface SetIsLoading {
  type: typeof SET_IS_LOADING;
  loading: boolean;
}

interface ResetForm {
  type: typeof RESET_FORM;
}

export type Action =
  | SetFromAddressData
  | SetToAddressData
  | SetFromCoordinates
  | SetToCoordinates
  | SetIsLoading
  | ResetForm;
