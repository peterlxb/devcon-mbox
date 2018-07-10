const Validator = require("validator");
const isEmpty = require("./is-empty");
//注册时的验证
module.exports = function validateRegisterInput(data) {
  let errors = {};
  //check the date.name is empty or not
  data.name = !isEmpty(data.name) ? data.name : " ";
  data.email = !isEmpty(data.email) ? data.email : " ";
  data.password = !isEmpty(data.password) ? data.password : " ";
  data.password2 = !isEmpty(data.password2) ? data.password2 : " ";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must between 2 and 30";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email  is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.email = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least  6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password2 field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Passwords must match";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
