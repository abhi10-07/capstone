const Validator = require("validator");
const { isEmpty } = require("./is_empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (!Validator.isEmail(data.email)) errors.email = "Invalid email";

  if (!Validator.isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password must be between 6 and 30 characters";

  if (Validator.isEmpty(data.email)) errors.email = "Email is required";

  if (Validator.isEmpty(data.password)) errors.password = "Email is required";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
