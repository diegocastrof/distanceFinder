import {
  State,
  Action,
  SET_FROM_ADDRESS_DATA,
  SET_TO_ADDRESS_DATA,
  SET_FROM_COORDINATES,
  SET_TO_COORDINATES,
  SET_IS_LOADING,
} from "./appTypes";

const initialAddressData = {
  street: "",
  city: "",
  country: "",
};

const initialCoordinates = {
  latitude: undefined,
  longitude: undefined,
  addressName: "",
  error: false,
  errorMessage: "",
};

export const initialState: State = {
  fromAddressData: initialAddressData,
  toAddressData: initialAddressData,
  fromCoordinates: initialCoordinates,

  toCoordinates: initialCoordinates,
  loading: false,
};

const apiReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_FROM_ADDRESS_DATA: {
      return {
        ...state,
        fromAddressData: action.fromAddressData,
      };
    }
    case SET_TO_ADDRESS_DATA: {
      return {
        ...state,
        fromAddressData: action.toAddressData,
      };
    }
    case SET_FROM_COORDINATES: {
      return {
        ...state,
        fromCoordinates: {
          ...state.fromCoordinates,
          ...action.fromCoordinates,
        },
      };
    }
    case SET_TO_COORDINATES: {
      return {
        ...state,
        toCoordinates: {
          ...state.toCoordinates,
          ...action.toCoordinates,
        },
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    default: {
      return state;
    }
  }
};

export default apiReducer;
