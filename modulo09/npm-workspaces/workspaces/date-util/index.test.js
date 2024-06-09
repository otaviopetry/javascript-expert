import { deepStrictEqual } from "assert";
import DateUtil from "./index.js";

// formatDate

{
  const format = "dd-M-Y";
  const date = new Date(1997, 4, 10);
  const expected = { error: `The format ${format} is not available yet.` };

  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}
{
  const format = "dd-mm-yyyy";
  const date = new Date("1997-05-10");
  const expected = "10-05-1997";

  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}
{
  const format = "dd/mm/yyyy";
  const date = new Date("1987-11-15");
  const expected = "15/11/1987";

  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}
{
  const format = "yyyy-mm-dd";
  const date = new Date("2022-10-07");
  const expected = "2022-10-07";

  const result = DateUtil.formatDate(date, format);

  deepStrictEqual(result, expected);
}

// formatString

{
  const data = "";
  const expected = { error: "An empty string was provided." };

  const result = DateUtil.formatString(data);

  deepStrictEqual(result, expected);
}
{
  const data = {
    value: "1990-april-01",
    format: "yyy-M-dd",
  };
  const expected = { error: `The format ${data.format} is not available yet.` };

  const result = DateUtil.formatString(data.value, data.format);

  deepStrictEqual(result, expected);
}
{
  const data = {
    value: "1990-01-01",
    format: "yyyy-mm-dd",
  };
  const expectedFormat = "dd/M/yyyy";
  const expected = {
    error: `The format ${expectedFormat} is not available yet.`,
  };

  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}
{
  const data = {
    value: "1990-01-01",
    format: "yyyy-mm-dd",
  };
  const expectedFormat = "dd-mm-yyyy";
  const expected = "01-01-1990";

  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}
{
  const data = {
    value: " 1 9 9 0 / 0 7 / 0 1 ",
    format: "yyyy/mm/dd",
  };
  const expectedFormat = "dd/mm/yyyy";
  const expected = "01/07/1990";

  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}
{
  const data = {
    value: " 1 9 9 0 / 0 7 / 0 1 ",
    format: "yyyy/mm/dd",
  };
  const expectedFormat = "yyyy-mm-dd";
  const expected = "1990-07-01";

  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}
{
  const data = {
    value: " 01/ 08 / 1 9 9 0",
    format: "dd/mm/yyyy",
  };
  const expectedFormat = "yyyy-mm-dd";
  const expected = "1990-08-01";

  const result = DateUtil.formatString(data.value, data.format, expectedFormat);

  deepStrictEqual(result, expected);
}
