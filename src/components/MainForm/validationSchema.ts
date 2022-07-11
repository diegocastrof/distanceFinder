import * as yup from "yup";

const requiredText = "This is a required field";

const schema = yup.object({
  fromStreet: yup.string().required(requiredText),
  fromCity: yup.string().required(requiredText),
  fromCountry: yup.string().required(requiredText),
  toStreet: yup.string().required(requiredText),
  toCity: yup.string().required(requiredText),
  toCountry: yup.string().required(requiredText),
});

export default schema;
