import * as yup from "yup";

export const addressSchema = yup.object().shape({
  cep: yup
    .string()
    .matches(
      /^[0-9]{8}$/,
      "CEP only accepts numbers. Must be exactly 8 digits."
    ),
  number: yup.string(),
  complement: yup.string(),
});
