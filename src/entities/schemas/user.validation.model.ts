import * as yup from "yup";

export const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email("E-mail invalid format"),
  password: yup.string().required().min(6, "Password is too short"),
  phone: yup.string().required(),
  birthDate: yup.date().required(),
});
