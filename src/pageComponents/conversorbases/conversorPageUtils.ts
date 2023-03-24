import { BaseTypes } from "~/types/conversorBases/conversorBasesTypes";

export function getBase(baseName: BaseTypes) {
  switch (baseName) {
    case "decimal":
      return 10;
    case "binary":
      return 2;
    case "hexadecimal":
      return 16;
  }
}

export function parseIntFromNumberString(
  numberString: string,
  baseName: BaseTypes
) {
  const base = getBase(baseName);

  const newIntegerString = numberString;

  const convertedNumber = Number.parseInt(newIntegerString, base);
  return !Number.isNaN(convertedNumber) ? convertedNumber : 0;
}

export function numberStringToStringArray(numberString: string) {
  const binaryCharArray: string[] = [];
  for (let i = 0; i < numberString.length; i++) {
    binaryCharArray.push(numberString.at(i) as string);
  }
  return binaryCharArray;
}

export function removeIllegalCharsFromNumberString(
  string: string,
  baseName: BaseTypes
) {
  let validString = string;

  const binaryRegex = /[^0-1]/g;
  const decimalRegex = /[^0-9]/g;
  const hexRegex = /[^0-9.a-fA-F]/g;

  switch (baseName) {
    case "binary":
      validString = string.replace(binaryRegex, "");
      break;
    case "decimal":
      validString = string.replace(decimalRegex, "");
      break;
    case "hexadecimal":
      validString = string.replace(hexRegex, "");
      break;
  }

  return validString !== "" ? validString : "0";
}

export function sumToNumberString(
  numberString: string,
  additionNumber: number,
  baseName: BaseTypes = "decimal"
) {
  const parsedNumberString = parseIntFromNumberString(numberString, baseName);

  return (parsedNumberString + additionNumber).toString(getBase(baseName));
}

export function updateNumberString(numberString: string) {
  if (numberString === "0") {
    return numberString.replace("0", "");
  } else if (numberString === "") {
    return "0";
  }

  return numberString;
}

export function convertNumberStringToBase(
  numberString: string,
  baseName: BaseTypes,
  newBaseName: BaseTypes
) {
  const currentInt = parseIntFromNumberString(numberString, baseName);

  return currentInt.toString(getBase(newBaseName));
}

export function translateBaseName(baseName: BaseTypes) {
  switch (baseName) {
    case "binary":
      return "Binário";

    case "decimal":
      return "Decimal";

    case "hexadecimal":
      return "Hexadecimal";
  }
}
