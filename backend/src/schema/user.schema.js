const yup = require("yup");

const userLoginSchema = yup.object().shape({
  body: yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is Required")
  }),
});

const userRegistrationSchema = yup.object().shape({
  body: yup.object({
    email: yup.string().email().required("Email is required"),
    name: yup.string().required("Name is required"),
    password: yup.string().required("Password is Required"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password Must Match")
      .required("Confirm Password is required"),
  }),
});

module.exports = { userLoginSchema, userRegistrationSchema };
