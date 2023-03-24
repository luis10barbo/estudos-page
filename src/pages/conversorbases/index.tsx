import type { NextPage } from "next";
import { type SetStateAction, useEffect, useRef, useState } from "react";
import { objectChildState } from "~/utils/react";

type BasesTypes = "binary" | "decimal" | "hexadecimal";
type Conversion = {
  from: BasesTypes;
  to: BasesTypes;
};

const BaseConverter: NextPage = () => {
  function getBase(baseName: BasesTypes) {
    switch (baseName) {
      case "decimal":
        return 10;
      case "binary":
        return 2;
      case "hexadecimal":
        return 16;
    }
  }

  function parseInt(integerString: string) {
    const base = getBase(conversionMode.from);
    const newIntegerString = integerString;

    const convertedNumber = Number.parseInt(newIntegerString, base);
    return !Number.isNaN(convertedNumber) ? convertedNumber : 0;
  }

  function numberToStringArray(convertedNumber: string) {
    const binaryCharArray: string[] = [];
    for (let i = 0; i < convertedNumber.length; i++) {
      binaryCharArray.push(convertedNumber.at(i) as string);
    }
    return binaryCharArray;
  }

  function removeIlegalCharsInput() {
    setInputValue((oldInputValue) => {
      let validString = oldInputValue;

      const binaryRegex = /[^0-1]/g;
      const decimalRegex = /[^0-9]/g;
      const hexRegex = /[^0-9.a-fA-F]/g;

      switch (conversionMode.from) {
        case "binary":
          validString = oldInputValue.replace(binaryRegex, "");
          break;
        case "decimal":
          validString = oldInputValue.replace(decimalRegex, "");
          break;
        case "hexadecimal":
          validString = oldInputValue.replace(hexRegex, "");
          break;
      }

      return validString !== "" ? validString : "0";
    });
  }

  function runConvertion() {
    const inputValueInt = parseInt(inputValue);

    removeIlegalCharsInput();

    const convertedNumber = inputValueInt.toString(getBase(conversionMode.to));
    const numberStringArray = numberToStringArray(convertedNumber);
    setConversionResult(numberStringArray);
  }

  const [conversionMode, setConversionMode] = useState<Conversion>({
    from: "decimal",
    to: "binary",
  });
  // const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("0");
  const [conversionResult, setConversionResult] = useState<string[]>([]);

  function addNumberToInput(additionNumber: number) {
    const inputValue = inputRef.current?.value;
    if (!inputValue) return;

    const parsedInputValue = parseInt(inputValue);

    const newInputValue = (parsedInputValue + additionNumber).toString(
      getBase(conversionMode.from)
    );

    setInputValue(newInputValue);
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

  function convertValueToBase(base: BasesTypes) {
    const currentInt = parseInt(inputValue);
    return currentInt.toString(getBase(base));
  }
  useEffect(() =>{ if(inputRef.current) return inputRef.current.focus()}, [])
  useEffect(() => {
    runConvertion();
  }, [inputValue, conversionMode]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <main
      className="min-w-fit w-full  flex min-h-screen flex-col items-center justify-center p-2 text-xl"
      style={{ fontFamily: "sans-serif" }}
    >
      <h2 className="mb-10 text-center">
        <p className="text-4xl font-bold">VISUALISADOR INTERATIVO</p> <br />
        DECIMAL - BINARIO - HEXADECIMAL
        <br />
      </h2>

      {/* <span className="text-red-500">{errorMessage}</span> */}
      <div
        id="convertion-holder"
        className="flex w-full flex-col flex-wrap items-center gap-2 rounded-lg "
      >
        <div className="flex flex-wrap items-center justify-center">
          <p className="flex items-center gap-2">
            Converter
            <select
              value={conversionMode.from}
              onChange={(event) => {
                const [conversionFrom, setConversionFrom] = objectChildState(
                  [conversionMode, setConversionMode],
                  "from"
                );
                setInputValue(
                  convertValueToBase(event.target.value as BasesTypes)
                );

                setConversionFrom(
                  event.target.value as SetStateAction<BasesTypes>
                );
              }}
              className="rounded-md border bg-transparent bg-white p-2"
            >
              <option value={"decimal"}>Decimal</option>
              <option value={"binary"}>Binario</option>
              <option value={"hexadecimal"}>Hexadecimal</option>
            </select>
          </p>
          <p className="ml-4 flex items-center gap-2 border-l pl-4">
            Para
            <select
              value={conversionMode.to}
              onChange={(event) => {
                const [conversionTo, setConversionTo] = objectChildState(
                  [conversionMode, setConversionMode],
                  "to"
                );

                setConversionTo(
                  event.target.value as SetStateAction<BasesTypes>
                );
              }}
              className="rounded-md border bg-transparent bg-white p-2"
            >
              <option value={"decimal"}>Decimal</option>
              <option value={"binary"}>Binario</option>
              <option value={"hexadecimal"}>Hexadecimal</option>
            </select>
          </p>
        </div>
        <div className="mt-4 flex w-full flex-col  gap-8 rounded-lg border-t p-12">
          <div
            id="typing-restriction"
            className="flex w-full items-center justify-center gap-2"
          >
            Restrição de escrita:{" "}
            {(() => {
              switch (conversionMode.from) {
                case "binary":
                  return <p className="text-red-400">binário (0-1)</p>;
                case "decimal":
                  return <p className="text-red-400">decimal (0-9)</p>;
                case "hexadecimal":
                  return <p className="text-red-400">decimal (0-9 a-f)</p>;
              }
            })()}
          </div>

          <div className=" flex w-full flex-nowrap justify-center gap-2 ">
            <button
              className="rounded-lg border bg-white py-1 px-4"
              onClick={() => {
                addNumberToInput(-1);
              }}
            >
              -
            </button>
            <input
              id="decimal-string"
              className=" rounded-lg border p-2 text-center outline-none"
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
              className="rounded-lg border bg-white py-1 px-4"
              onClick={() => {
                addNumberToInput(1);
              }}
            >
              +
            </button>
          </div>
          <div
            id="result-holder"
            className="flex w-full flex-col items-center gap-2 "
          >
            Resultado:
            <div className="flex w-full justify-center gap-1 ">
              {conversionResult.map((currentChar, index) => (
                <div
                  className="rounded-lg border bg-white py-2 px-4 "
                  key={index}
                >
                  {currentChar}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="explanation mb-4 flex w-full flex-col items-center gap-4 border-t p-4 text-center">
        <p className="font-bold">Explicação Binario:</p> <br />
        Cada quadradinho no binário, <br />
        diferente do decimal, que pode conter algarísmos entre 0-9,
        <br />
        somente pode conter dois números, 0 ou 1
        <div className="flex items-center gap-2">
          ex:
          <div className="binary-number rounded-lg border py-2 px-4">1</div>
          (decimal) é equivalente a
          <div className="binary-number rounded-lg border py-2 px-4">1</div>
          (binario), <br />
        </div>
        <div className="flex items-center gap-2">
          mas para o
          <div className="binary-number rounded-lg border py-2 px-4">2</div>
          (decimal) é necessario adicionar +1 quadradinho:
        </div>
        {[
          ["1", "0"],
          ["1", "1"],
          ["1", "0", "0"],
          ["1", "0", "1"],
        ].map((element, index) => {
          return (
            <div
              className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white"
              key={index}
            >
              <div className="binary-number rounded-lg border py-2 px-4">
                {2 + index}
              </div>
              (decimal) que é equivalente ao
              {element.map((element, index) => {
                return (
                  <div
                    className="binary-number rounded-lg border py-2 px-4"
                    key={index}
                  >
                    {element}
                  </div>
                );
              })}
              (binario), <br />
            </div>
          );
        })}
        já que o binário só permite números de 0 a 1.
      </div>
      <div className="explanation mb-4 flex w-full flex-col items-center gap-4 border-b p-4 text-center">
        <p className="font-bold">Explicação Hexadecimal:</p> <br />
        Cada quadradinho no hexadecimal suporta, <br />
        como no decimal, algorismos entre 0-9 (hex: 0-9).
        <br />
        Contudo, ele vai além: suportando também o 10-15 (hex: a-f)
        {["a", "b", "c", "d", "e", "f"].map((element, index) => {
          return (
            <div
              className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white"
              key={index}
            >
              <div className="binary-number rounded-lg border py-2 px-4">
                {10 + index}
              </div>
              (decimal) que é equivalente ao
              <div className="binary-number rounded-lg border py-2 px-4">
                {element}
              </div>
              (hexadecimal), <br />
            </div>
          );
        })}
        <div className="flex items-center gap-2">
          ao ultrapassar o
          <div className="binary-number rounded-lg border py-2 px-4">f</div>
          (hexadecimal) é necessario adicionar +1 quadradinho:
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white">
          <div className="binary-number rounded-lg border py-2 px-4">1</div>
          <div className="binary-number rounded-lg border py-2 px-4">5</div>
          (decimal) é igual a
          <div className="binary-number rounded-lg border py-2 px-4">F</div>
          (hexadecimal)
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white">
          <div className="binary-number rounded-lg border py-2 px-4">1</div>
          <div className="binary-number rounded-lg border py-2 px-4">6</div>
          (decimal) é igual a
          <div className="binary-number rounded-lg border py-2 px-4">1</div>
          <div className="binary-number rounded-lg border py-2 px-4">0</div>
          (hexadecimal)
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white">
          <div className="binary-number rounded-lg border py-2 px-4">3</div>
          <div className="binary-number rounded-lg border py-2 px-4">1</div>
          (decimal) é igual a
          <div className="binary-number rounded-lg border py-2 px-4">1</div>
          <div className="binary-number rounded-lg border py-2 px-4">F</div>
          (hexadecimal)
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white">
          <div className="binary-number rounded-lg border py-2 px-4">3</div>
          <div className="binary-number rounded-lg border py-2 px-4">2</div>
          (decimal) é igual a
          <div className="binary-number rounded-lg border py-2 px-4">2</div>
          <div className="binary-number rounded-lg border py-2 px-4">0</div>
          <div className="binary-number rounded-lg border py-2 px-4">0</div>
          (hexadecimal)
        </div>
      </div>
      <div
        id="planned-updates"
        className="m-4 flex w-full max-w-[60rem] flex-col items-center gap-2 rounded-lg bg-[rgba(0,0,0,0.8)] p-4 text-white/95"
      >
        <p className="title text-2xl">Atualizações planejadas</p>
        {[
          { title: "Adicionar binarios negativos", status: "Em Espera" },
          { title: "Adicionar hexadecimais negativos", status: "Em espera" },
        ].map((element, index) => {
          return (
            <div
              className="flex w-full flex-wrap items-center justify-center border-b p-4"
              key={index}
            >
              <p className=" text-center" key={index}>
                {element.title}
              </p>
              <div className="ml-auto mr-auto"></div>
              <p className="rounded-lg bg-white p-2 text-sm capitalize text-black">
                Status: {element.status}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default BaseConverter;
