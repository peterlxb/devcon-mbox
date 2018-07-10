const Validator = require("validator");
const isEmpty = require("./is-empty");
//登陆时的验证
module.exports = function validateExperienceInput(data) {
  let errors = {};
  //check the date.name is empty or not
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
