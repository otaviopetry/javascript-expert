import StringUtil from "@otaviopetry/string-util";

const availableFormats = {
  "dd-mm-yyyy": "$<day>-$<month>-$<year>",
  "dd/mm/yyyy": "$<day>/$<month>/$<year>",
  "yyyy-mm-dd": "$<year>-$<month>-$<day>",
  "yyyy/mm/dd": "$<year>/$<month>/$<day>",
};

const yyyymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g;
const ddmmyyyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g;

const stringToDateExpressions = {
  "dd-mm-yyyy": ddmmyyyy,
  "dd/mm/yyyy": ddmmyyyy,
  "yyyy-mm-dd": yyyymmdd,
  "yyyy/mm/dd": yyyymmdd,
};

export default class DateUtil {
  static formatDate(date, format) {
    if (!Object.keys(availableFormats).includes(format)) {
      return { error: `The format ${format} is not available yet.` };
    }

    const expression = availableFormats[format];
    const [result] = date.toISOString().match(yyyymmdd);

    return result.replace(yyyymmdd, expression);
  }

  static formatString(date, currentFormat, expectedFormat) {
    if (StringUtil.isEmpty(date)) {
      return { error: "An empty string was provided." };
    }

    if (!Object.keys(availableFormats).includes(currentFormat)) {
      return { error: `The format ${currentFormat} is not available yet.` };
    }

    if (!Object.keys(availableFormats).includes(expectedFormat)) {
      return { error: `The format ${expectedFormat} is not available yet.` };
    }

    const toDateExpression = stringToDateExpressions[currentFormat];
    const dateString = StringUtil.removeEmptySpaces(date).replace(
      toDateExpression,
      availableFormats["yyyy-mm-dd"]
    );
    const dateObject = new Date(dateString);

    return DateUtil.formatDate(dateObject, expectedFormat);
  }
}
