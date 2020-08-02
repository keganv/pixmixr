const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';
const VALIDATOR_TYPE_NUMBER = 'NUMBER';

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = val => ({type: VALIDATOR_TYPE_MINLENGTH, val: val});
export const VALIDATOR_MAXLENGTH = val => ({type: VALIDATOR_TYPE_MAXLENGTH, val: val});
export const VALIDATOR_MIN = val => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = val => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_NUMBER = val => ({ type: VALIDATOR_TYPE_NUMBER, val: val });

export const validate = (value, validators) => {
  let valid = true;
  let error = '';
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      valid = value.trim().length > 0 || value > 0;
      error = 'This field is required.';
      if (!valid) {
        break;
      }
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      valid = valid && value.trim().length >= validator.val;
      error = `This field must be at least ${validator.val} characters.`;
      if (!valid) {
        break;
      }
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      valid = valid && value.trim().length <= validator.val;
      error = `This field cannot be more than ${validator.val} characters.`;
      if (!valid) {
        break;
      }
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      valid = Number(value) >= validator.val;
      error = `This field must have a value of at least ${validator.val}.`;
      if (!valid) {
        break;
      }
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      valid = Number(value) <= validator.val;
      error = !valid ? `This field cannot have a value more than ${validator.val}.` : '';
      if (!valid) {
        break;
      }
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      valid = valid && /^\S+@\S+\.\S+$/.test(value);
      error = 'This field must be a valid email.'
      if (!valid) {
        break;
      }
    }
    if (validator.type === VALIDATOR_TYPE_NUMBER) {
      valid = valid && !isNaN(value.trim());
      error = 'This field must be a number.'
      if (!valid) {
        break;
      }
    }
  }

  return {valid, error};
};
