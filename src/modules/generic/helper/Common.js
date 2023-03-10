import Helper from "common/Helper";
import Colors from "common/Colors";
import {
  faFacebookF,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/fontawesome-free-brands";
export default {
  VERSION: "1.0",
  KEYHELPA_RATE: {
    type: "percentage",
    fee: 11,
  },
  getReceiveFeeCalculation(fee, rate, currency) {
    // let fee = this.KEYHELPA_RATE
    if (fee.type == "percentage") {
      return (
        this.getCurrencySymbol(currency) +
        " " +
        parseFloat(rate - (fee.fee / 100) * rate).toFixed(2)
      );
    }
    return (
      this.getCurrencySymbol(currency) +
      " " +
      parseFloat(rate - fee.fee).toFixed(2)
    );
  },
  getFeeCalculation(fee, rate, currency) {
    // let fee = this.KEYHELPA_RATE
    if (fee.type == "percentage") {
      return (
        this.getCurrencySymbol(currency) +
        " " +
        parseFloat((fee.fee / 100) * rate).toFixed(2)
      );
    }
    return (
      this.getCurrencySymbol(currency) + " " + parseFloat(fee.fee).toFixed(2)
    );
  },
  getFirstLetterCapitalize(title) {
    if (title) {
      let lowercase = title.toLowerCase();
      let text = lowercase[0].toUpperCase() + lowercase.substring(1);
      return text;
    }
    return null;
  },
  getCurrencySymbol(currency) {
    let symbol = "$";
    if (currency) {
      switch (currency.toLowerCase()) {
        case "usd": {
          symbol = "$";
          break;
        }
        case "aud": {
          symbol = "A$";
          break;
        }
        case "a$": {
          symbol = "A$";
          break;
        }
        default: {
          symbol = currency;
          break;
        }
      }
    }
    return symbol;
  },
  getAmountWithCurrency(currency, amount) {
    let symbol = "$";
    if (currency) {
      switch (currency.toLowerCase()) {
        case "usd": {
          symbol = "$";
          break;
        }
        case "aud": {
          symbol = "A$";
          break;
        }
        case "a$": {
          symbol = "A$";
          break;
        }
        default: {
          symbol = currency;
          break;
        }
      }
    }
    return (
      this.getCurrencySymbol(currency) + " " + parseFloat(amount).toFixed(2)
    );
  },
  toSentenceCase(word) {
    if (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }
    return "";
  },
  getCompleteName(information) {
    return information.first_name && information.last_name
      ? this.toSentenceCase(information.first_name) +
          " " +
          this.toSentenceCase(information.last_name)
      : "";
  },
  setColor() {
    if (Helper.ACCOUNT_TYPE === "landing") {
      let curr_path = window.location.pathname;
      console.log("<>><<><><><><><<<><>", curr_path.includes("agent"));
      if (curr_path.includes("agent")) {
        Colors.footerBackground = "#59687A";
        Colors.footerIcons = "#E62D7E";
      } else {
        let curr_path = localStorage.getItem("user_type");
        Colors.footerBackground = curr_path === "agent" ? "#59687A" : "#f290bb";
        Colors.footerIcons = curr_path === "agent" ? "#E62D7E" : "#34475D";
      }
    }
  },
  getAdditionalDetailsOnJobsTerms(terms, variable) {
    let additionDetails = terms.additional_details;
    if (additionDetails) {
      return additionDetails[variable];
    }
    return null;
  },
  getContractValue(terms) {
    if (
      terms &&
      terms.additional_details &&
      terms.additional_details.total_value
    ) {
      return this.getAmountWithCurrency(
        terms.currency,
        terms.additional_details.total_value
      );
    }
    return this.getAmountWithCurrency(terms.currency, 0);
  },
  getHourlyRate(terms) {
    if (terms && terms.hourly_rate) {
      return this.getAmountWithCurrency(terms.currency, terms.hourly_rate);
    }
    return this.getAmountWithCurrency(terms.currency, 0);
  },
  getPages(size, offset, limit) {
    let total = Math.ceil(size / limit);
    let pages = [];
    for (let index = 0; index < total; index++) {
      pages.push(index + 1);
    }
    return pages;
  },
  getCompleteAddress(information) {
    let location = JSON.parse(information);
    let route = "";
    if (location.suburb) {
      route += location.suburb;
    }
    if (location.region) {
      route += ", " + location.region;
    }
    if (location.state) {
      route += ", " + location.state;
    }
    return route;
  },
  getAvailability(data) {
    if (data && data.availability) {
      let availability = data.availability;
      if (availability && availability.hours) {
        return availability.hours + " hours / week";
      }
    }
    return "0 hours / week";
  },
  getSocialIcon(item) {
    switch (item.toLowerCase(item)) {
      case "facebook":
        return faFacebookF;
      case "youtube":
        return faYoutube;
      case "linkedin":
        return faLinkedinIn;
    }
  },
  getSocialMedia(data) {
    let array = [];
    let links = JSON.parse(data.details);
    for (var key in links) {
      if (
        links.hasOwnProperty(key) &&
        links[key] != null &&
        links[key] != "null"
      ) {
        array.push({
          title: key,
          url: links[key],
          icon: this.getSocialIcon(key),
        });
      }
    }
    return array;
  },
};
