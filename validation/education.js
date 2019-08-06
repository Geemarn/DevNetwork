const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateEducationInput = data => {
  let errors = {};
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  //school validation
  if (validator.isEmpty(data.school)) {
    errors.school = "school field is required";
  }

  //degree validation
  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }

  //fieldOfStudy validation
  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "field-of-study field is required";
  }
  //from validation
  if (validator.isEmpty(data.from)) {
    errors.from = "start date field is required";
  }
  //return
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
