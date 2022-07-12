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
  latitude?: number;
  longitude?: number;
  addressName?: string;
}
