const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateRegisterInput = data => {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  //name validation
  if (!validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "name field required";
  }

  //email validation
  if (!validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "email field required";
  }

  //password validation
  if (!validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "password must be between 6 and 20 characters";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "password field required";
  }

  //password2 validation
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "password do not match";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "confirm password field required";
  }

  //return
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
