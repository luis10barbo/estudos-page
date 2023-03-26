import { type SetStateAction, useEffect, useRef, useState } from "react";
import PlannedUpdatesComponent from "~/components/PlannedUpdatesComponent";
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
    if (inputRef.current?.value === undefined) return;

    const newValue = removeIllegalCharsFromNumberString(
      inputRef.current?.value,
      conversionMode.from
    );

    setInputValue(newValue);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div
        id="convertion-holder"
        className="flex  w-full flex-col flex-wrap items-center gap-2"
      >
        <div className="flex w-full flex-wrap items-center justify-center gap-2 bg-[rgb(90,90,90)] p-4 text-white">
          <p className="flex items-center gap-2">
            De
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
              className="rounded-md border border-[rgba(255,255,255,0.8)]  bg-[rgb(55,55,55)] p-2"
            >
              <option value={"decimal"}>Decimal</option>
              <option value={"binary"}>Binario</option>
              <option value={"hexadecimal"}>Hexadecimal</option>
            </select>
          </p>
          <p className=" flex flex-nowrap items-center gap-2">
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
              className="rounded-md  border border-[rgba(255,255,255,0.8)]   bg-[rgb(55,55,55)] p-2 "
            >
              <option value={"decimal"}>Decimal</option>
              <option value={"binary"}>Binario</option>
              <option value={"hexadecimal"}>Hexadecimal</option>
            </select>
          </p>
        </div>
        <div className="flex min-h-[40vh] w-full flex-col justify-center  gap-8 border-[rgba(0,0,0,0.5)] p-8 text-lg">
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

          <div className=" flex w-full flex-wrap justify-center gap-2 ">
            <input
              id="decimal-string"
              className=" max-w-screen-lg  flex-1 rounded-lg border border-[rgba(0,0,0,0.5)] p-2 text-center outline-none"
              type="text"
              style={{ width: "8rem" }}
              value={inputValue}
              onFocus={(e) => e.target.select()}
              onChange={() => {
                updateInputValue();
              }}
              ref={inputRef}
            />
            <div className="flex flex-nowrap gap-2">
              <button
                className="min-w-[2.5rem]  rounded-lg bg-[rgb(90,90,90)] text-white hover:bg-[rgb(130,130,130)]"
                onClick={() => {
                  sumNumberToInput(-1);
                }}
              >
                -
              </button>
              <button
                className="hov  min-w-[2.5rem] rounded-lg bg-[rgb(90,90,90)] py-1 text-white hover:bg-[rgb(130,130,130)]"
                onClick={() => {
                  sumNumberToInput(1);
                }}
              >
                +
              </button>
            </div>
          </div>
          <div
            id="result-holder"
            className="flex w-full flex-col items-center gap-2 "
          >
            <div className="flex w-full flex-col justify-center gap-1">
              {inputValue.at(0) !== "-" ? (
                <BaseComparisonComponent
                  firstBaseName={conversionMode.from}
                  secondBaseName={conversionMode.to}
                  numberStrings={[inputValue]}
                  flexCol={true}
                />
              ) : (
                "Operação com numeros negativos nao implementada ainda..."
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="m-4 my-auto flex flex-1 flex-col justify-evenly">
        <BinaryExplanationComponent />
        <HexadecimalExplanationComponent />
      </div>

      <PlannedUpdatesComponent
        updates={[
          {
            title: "Adicionar binarios e hexadecimais negativos",
            status: "onhold",
          },
          {
            title: "Atualizar estilo explicação hexadecimal",
            status: "completed",
          },
        ]}
      />
    </div>
  );
};

export default BaseConverterComponent;
