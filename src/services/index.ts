import { AxiosResponse } from "axios";
import qs from "query-string";

import { createHttpRequest } from "./helpers";
import { AddressData } from "models";
import { GetLocationRequestResponse } from "./types";

export default {
  getLocationRequest(
    addressData: AddressData,
  ): Promise<AxiosResponse<GetLocationRequestResponse[]>> {
    return createHttpRequest().get(
      `/search/?format=json&${qs.stringify(addressData)}`,
    );
  },
};
