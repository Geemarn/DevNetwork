const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateLPostInput = data => {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  //text validation
  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "post must be between 10 and 300 characters";
  }
  if (validator.isEmpty(data.text)) {
    errors.text = "text field required";
  }

  //return
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
