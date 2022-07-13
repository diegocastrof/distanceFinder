import { Timestamp } from "firebase/firestore";

export interface MainFormData {
  fromStreet: string;
  fromCity: string;
  fromCountry: string;
  toStreet: string;
  toCity: string;
  toCountry: string;
}

export interface AddressData {
  street: string;
  city: string;
  country: string;
}

export interface Coordinates {
  latitude: number | undefined;
  longitude: number | undefined;
  addressName?: string;
  error: boolean;
  errorMessage?: string;
}

export interface ResultData {
  fromAddressName: string;
  fromAddressLatitude: number;
  fromAddressLongitude: number;
  toAddressName: string;
  toAddressLatitude: number;
  toAddressLongitude: number;
  distance: number;
  created: Timestamp;
}

export type AddressType = "from" | "to";
