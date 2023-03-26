import { useRef, useState } from "react";
import { reverseState } from "~/utils/react";
import { NumberStringComponent } from "../NumberStringComponent";
import BaseComparisonComponent from "./BaseComparisonComponent";

export const BinaryExplanationComponent: React.FC = () => {
  const [isFocused, setFocused] = useState(false);

  const explanationRef = useRef<HTMLDivElement>(null);

  function getExplanationHeight() {
    if (explanationRef.current !== null)
      return explanationRef.current.clientHeight;
  }

  return (
    <div
      className={`binary-explanation mb-4 flex w-full flex-col items-center rounded-xl bg-gradient-to-tr from-blue-800 to-purple-600 text-center text-white  duration-75 ${
        isFocused ? "" : "hover:from-blue-600 hover:to-purple-400"
      }`}
    >
      <div
        className="w-full cursor-pointer select-none border-white p-4 font-bold"
        onClick={() => {
          reverseState(setFocused);
        }}
      >
        Explicação Binario ▾
      </div>
      <div
        style={{
          ...(getExplanationHeight() && {
            height: isFocused
              ? (getExplanationHeight() as number).toString() + "px"
              : "0",
          }),
        }}
        className={`content  w-full overflow-hidden px-4 duration-75 ${
          isFocused ? "h-fit overflow-auto border-t" : "h-0"
        }`}
      >
        <div
          ref={explanationRef}
          id="binary-explanation"
          className="flex flex-col items-center gap-2 p-4"
        >
          <br />
          Cada quadradinho no binário, <br />
          diferente do decimal, que pode conter algarísmos entre 0-9,
          <br />
          somente pode conter dois números, 0 ou 1
          <BaseComparisonComponent
            numberStrings={["0", "1"]}
            firstBaseName="decimal"
            secondBaseName="binary"
          />
          <div className="flex items-center justify-center gap-2">
            mas para o
            <NumberStringComponent baseName={"decimal"} numberString="2" /> é
            necessario adicionar +1 quadradinho:
          </div>
          <BaseComparisonComponent
            numberStrings={["0", "1", "2", "3"]}
            firstBaseName="decimal"
            secondBaseName="binary"
          />
          já que o binário só permite números de 0 a 1.
        </div>
      </div>
    </div>
  );
};

export const HexadecimalExplanationComponent: React.FC = () => {
  const [isFocused, setFocused] = useState(false);

  const explanationRef = useRef<HTMLDivElement>(null);

  function getExplanationHeight() {
    if (explanationRef.current !== null)
      return explanationRef.current.clientHeight;
  }

  return (
    <>
      <div
        className={`mb-4 flex w-full flex-col items-center rounded-xl bg-gradient-to-tr from-blue-800 to-purple-600 text-center text-white  duration-75 ${
          isFocused ? "" : "hover:from-blue-600 hover:to-purple-400"
        }`}
      >
        <div
          className="w-full cursor-pointer select-none border-white p-4 font-bold"
          onClick={() => {
            reverseState(setFocused);
          }}
        >
          Explicação Hexadecimal ▾
        </div>
        <div
          style={{
            ...(getExplanationHeight() && {
              height: isFocused
                ? (getExplanationHeight() as number).toString() + "px"
                : "0",
            }),
          }}
          className={`content  w-full overflow-hidden px-4 duration-75 ${
            isFocused ? "border-t" : "h-0"
          }`}
        >
          <div
            ref={explanationRef}
            id="hexadecimal-explanation"
            className="flex flex-col items-center gap-2 p-4"
          >
            Cada quadradinho no hexadecimal suporta,
            <br /> como no decimal, algorismos entre 0-9 (hex: 0-9).
            <br /> Contudo, ele vai além: suportando também o 10-15 (hex: a-f)
            <BaseComparisonComponent
              numberStrings={["10", "11", "12", "13", "14", "15"]}
              firstBaseName="decimal"
              secondBaseName="hexadecimal"
            />
            <div className="flex items-center justify-center gap-2">
              ao ultrapassar o{" "}
              <NumberStringComponent
                baseName={"hexadecimal"}
                numberString="f"
              />{" "}
              é é necessario adicionar +1 quadradinho:
            </div>
            <BaseComparisonComponent
              numberStrings={["15", "16", "31", "32"]}
              firstBaseName="decimal"
              secondBaseName="hexadecimal"
            />
          </div>
        </div>
      </div>
    </>
  );
};
