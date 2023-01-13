export default {
  validate(value, setting, column) {
    switch (setting.type.toLowerCase()) {
      case "email": {
        if (!value) return column + " is required.";
        if (!this.checkEmail(value)) return column + " is invalid.";
        return true;
      }
      case "text": {
        if (!value) return column + " is required.";
        if (value.length < setting.size)
          return column + " requires atleast " + setting.size + " characters.";
        return true;
      }
      case "phone_number": {
        if (!value) return column + " is required.";
        if (value.length < 8)
          return column + " requires atleast " + setting.size + " digits.";
        if (isNaN(value)) return column + " is invalid";
        return true;
      }
      case "text_without_space": {
        if (!value) return column + " is required.";
        if (value && value.indexOf(" ") >= 0)
          return column + " should not contain spaces.";
        return true;
      }
      case "number": {
        if (!value) return column + " is required.";
        if (isNaN(value)) return column + " is invalid.";
        return true;
      }
    }
  },
  checkEmail(value) {
    let reg =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+.[a-zA-Z0-9]*$/;
    let reqWhiteSpace = /\s/;
    if (reqWhiteSpace.test(value)) {
      return false;
    }
    return reg.test(value) !== false;
  },
};
