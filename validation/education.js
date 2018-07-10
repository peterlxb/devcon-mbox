const Validator = require("validator");
const isEmpty = require("./is-empty");
//登陆时的验证
module.exports = function validateEducationInput(data) {
  let errors = {};
  //check the date.name is empty or not
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldstudy = !isEmpty(data.fieldstudy) ? data.fieldstudy : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Filedoftudy field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
