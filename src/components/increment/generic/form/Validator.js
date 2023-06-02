const CHAR_ES18_REGEX = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const EMOJI_REGEX = /\p{Emoji}/u;
const EMAIL_REGEX = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,})+$/;
const LETTER_REGEX = /^[A-Za-z\s]*$/;

export default {
  validate(value, setting) {
    const { column } = setting;
    switch (setting.type.toLowerCase()) {
      case "required": {
        if (!value) return column + " is required.";
        return null;
      }
      case "email": {
        if (!value) return column + " is required.";
        if (!EMAIL_REGEX.test(value)) return column + " is invalid.";
        return null;
      }
      case "text": {
        if (value.length < setting.size)
          return column + " requires at least " + setting.size + " characters.";
        return null;
      }
      case "phone_number": {
        if (!value) return column + " is required.";
        if (value.length < 8)
          return column + " requires at least " + setting.size + " digits.";
        if (isNaN(value)) return column + " is invalid";
        return null;
      }
      case "text_without_space": {
        if (!value) return column + " is required.";
        if (value && value.indexOf(" ") >= 0)
          return column + " should not contain spaces.";
        return null;
      }
      case "text_without_numbers": {
        if (value && value.match(/\d+/g))
          return column + " should not contain numbers.";
        return null;
      }
      case "text_without_special_characters": {
        if (value && CHAR_ES18_REGEX.test(value))
          return column + " should not contain special characters.";
        return null;
      }
      case "text_without_emojis": {
        if (value && EMOJI_REGEX.test(value))
          return column + " should not contain emojis.";
        return null;
      }
      case "number": {
        if (!value) return column + " is required.";
        if (isNaN(value)) return column + " is invalid.";
        return null;
      }
      case "only_letters": {
        if (!LETTER_REGEX.test(value)) {
          return column + " should contain letters only.";
        }
        return null;
      }
      case "australian_phone": {
        if (!value.startsWith("04")) {
          return column + ' should start from "04"';
        }
        return null;
      }
    }
  },
};
