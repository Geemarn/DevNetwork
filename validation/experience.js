const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateExperienceInput = data => {
  let errors = {};
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  //title validation
  if (validator.isEmpty(data.title)) {
    errors.title = "job title field is required";
  }

  //company validation
  if (validator.isEmpty(data.company)) {
    errors.company = "company field is required";
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
