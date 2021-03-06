const Validator = require("validator");
const { isEmpty } = require("./is_empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (!Validator.isEmail(data.email)) errors.email = "Invalid email";

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (!Validator.isLength(data.password2, { min: 6, max: 30 })) {
    errors.password2 = "Confirm password must be between 6 and 30 characters";
  }

  if (!Validator.equals(data.password, data.password2))
    errors.password2 = "Password should be same";

  if (Validator.isEmpty(data.name)) errors.name = "Name is required";

  if (Validator.isEmpty(data.email)) errors.email = "Email is required";

  if (Validator.isEmpty(data.password))
    errors.password = "Password is required";

  if (Validator.isEmpty(data.password2))
    errors.password2 = "Confirm password is required";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
