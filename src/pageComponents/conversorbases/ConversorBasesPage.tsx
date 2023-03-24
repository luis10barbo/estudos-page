import { type SetStateAction, useEffect, useRef, useState } from "react";
import { objectChildState } from "~/utils/react";
import type {
  ConversionObject,
  BaseTypes,
} from "../../types/conversorBases/conversorBasesTypes";
import BaseComparisonComponent from "./BaseComparisonComponent";
import {
  BinaryExplanationComponent,
  HexadecimalExplanationComponent,
} from "./BaseExplanationsComponents";
import {
  convertNumberStringToBase,
  getBase,
  numberStringToStringArray,
  parseIntFromNumberString,
  removeIllegalCharsFromNumberString,
  sumToNumberString,
} from "./conversorPageUtils";

const BaseConverterComponent: React.FC = () => {
  const [conversionMode, setConversionMode] = useState<ConversionObject>({
    from: "decimal",
    to: "binary",
  });
  const [inputValue, setInputValue] = useState("0");
  const [_, setConversionResult] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) return inputRef.current.focus();
  }, []);
  useEffect(() => {
    runConvertion();
  }, [inputValue, conversionMode.to]);
  useEffect(() => {}, [conversionMode.from]);

  function runConvertion() {
    const inputValueInt = parseIntFromNumberString(
      inputValue,
      conversionMode.from
    );

    const convertedNumber = inputValueInt.toString(getBase(conversionMode.to));
    const numberStringArray = numberStringToStringArray(convertedNumber);
    setConversionResult(numberStringArray);
  }

  function sumNumberToInput(sum: number) {
    setInputValue((oldValue) =>
      sumToNumberString(oldValue, sum, conversionMode.from)
    );
  }

  function updateInputValue() {
    const newValue = inputRef.current?.value;
    if (newValue === undefined) return;

    if (inputValue === "0") {
      return setInputValue(newValue.replace("0", ""));
    } else if (newValue === "") {
      setInputValue("0");
      return;
    }
    setInputValue(newValue);
  }

  return (
    <div>
      <div
        id="convertion-holder"
        className="flex  w-full flex-col flex-wrap items-center gap-2"
      >
        <div className="flex w-full flex-wrap items-center justify-center bg-black/80 p-4 text-white">
          <p className="flex items-center gap-2">
            Converter
            <select
              value={conversionMode.from}
              onChange={(event) => {
                const [conversionFrom, setConversionFrom] = objectChildState(
                  [conversionMode, setConversionMode],
                  "from"
                );

                setInputValue((oldInputValue) =>
                  convertNumberStringToBase(
                    oldInputValue,
                    conversionFrom,
                    event.target.value as BaseTypes
                  )
                );

                setConversionFrom(
                  event.target.value as SetStateAction<BaseTypes>
                );
              }}
              className="rounded-md border border-[rgba(0,0,0,0.5)] bg-[rgb(90,90,90)] p-2 "
            >
              <option value={"decimal"}>Decimal</option>
              <option value={"binary"}>Binario</option>
              <option value={"hexadecimal"}>Hexadecimal</option>
            </select>
          </p>
          <p className="ml-4 flex items-center gap-2">
            Para
            <select
              value={conversionMode.to}
              onChange={(event) => {
                const [conversionTo, setConversionTo] = objectChildState(
                  [conversionMode, setConversionMode],
                  "to"
                );

                setConversionTo(
                  event.target.value as SetStateAction<BaseTypes>
                );
              }}
              className="rounded-md  border border-[rgba(0,0,0,0.5)] bg-[rgb(90,90,90)] p-2 "
            >
              <option value={"decimal"}>Decimal</option>
              <option value={"binary"}>Binario</option>
              <option value={"hexadecimal"}>Hexadecimal</option>
            </select>
          </p>
        </div>
        <div className=" flex min-h-[40vh] w-full flex-col  justify-center gap-8 border-[rgba(0,0,0,0.5)] p-8">
          <div
            id="typing-restriction"
            className="flex w-full items-center justify-center gap-2"
          >
            Restrição de escrita:{" "}
            {(() => {
              switch (conversionMode.from) {
                case "binary":
                  return <p className="text-red-400">Binário (0-1)</p>;
                case "decimal":
                  return <p className="text-red-400">Decimal (0-9)</p>;
                case "hexadecimal":
                  return <p className="text-red-400">Hexadecimal (0-9 a-f)</p>;
              }
            })()}
          </div>

          <div className=" flex w-full flex-nowrap justify-center gap-2 ">
            <button
              className="rounded-lg  border border-[rgba(0,0,0,0.5)] bg-white py-1 px-4"
              onClick={() => {
                sumNumberToInput(-1);
              }}
            >
              -
            </button>
            <input
              id="decimal-string"
              className=" rounded-lg  border border-[rgba(0,0,0,0.5)] p-2 text-center outline-none"
              type="text"
              style={{ width: "10rem" }}
              value={inputValue}
              onFocus={(e) => e.target.select()}
              onChange={() => {
                updateInputValue();
              }}
              ref={inputRef}
            />
            <button
              className="rounded-lg  border border-[rgba(0,0,0,0.5)] bg-white py-1 px-4"
              onClick={() => {
                sumNumberToInput(1);
              }}
            >
              +
            </button>
          </div>
          <div
            id="result-holder"
            className="flex w-full flex-col items-center gap-2 "
          >
            <div className="flex w-full justify-center gap-1 ">
              {inputValue.at(0) !== "-" ? (
                <BaseComparisonComponent
                  firstBaseName={conversionMode.from}
                  secondBaseName={conversionMode.to}
                  numberStrings={[inputValue]}
                />
              ) : (
                "Operação com numeros negativos nao implementada ainda..."
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="m-12 ">
        <BinaryExplanationComponent />
        TODO: atualizar estilo Explicação hexadecimal
        <HexadecimalExplanationComponent />
      </div>
    </div>
  );
};

export default BaseConverterComponent;
