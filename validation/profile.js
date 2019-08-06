const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateProfileInput = data => {
  let errors = {};
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  //handle validation
  if (!validator.isLength(data.handle, { min: 3, max: 40 })) {
    errors.handle = "Name must be between 3 and 40 characters";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "profile handle is required";
  }

  //status validation
  if (validator.isEmpty(data.status)) {
    errors.status = "status field required";
  }

  //skills validation
  if (validator.isEmpty(data.skills)) {
    errors.skills = "skills field required";
  }

  //website validation
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
  //socials validation
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.linkedIn)) {
    if (!validator.isURL(data.linkedIn)) {
      errors.linkedIn = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  //return
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
