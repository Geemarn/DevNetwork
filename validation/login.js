const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateLoginInput = data => {
  let errors = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //email validation
  if (!validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "email field required";
  }

  //password validation
  if (validator.isEmpty(data.password)) {
    errors.password = "password field required";
  }
  //return
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
