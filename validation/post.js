const Validator = require("validator");
const isEmpty = require("./is-empty");
//登陆时的验证
module.exports = function validatePostInput(data) {
  let errors = {};
  //check the date.name is empty or not
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
