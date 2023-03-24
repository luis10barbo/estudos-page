import { NumberStringComponent } from "../NumberStringComponent";
import BaseComparisonComponent from "./BaseComparisonComponent";

export const BinaryExplanationComponent: React.FC = () => {
  return (
    <div className="binary-explanation mb-4 flex w-full flex-col items-center gap-4 rounded-xl bg-[rgb(90,90,90)] p-4 text-center text-white">
      <p className="w-full border-b border-white pb-4 font-bold">
        Explicação Binario:
      </p>{" "}
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
      <div className="flex items-center gap-2">
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
  );
};

export const HexadecimalExplanationComponent: React.FC = () => {
  return (
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
            <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
              {10 + index}
            </div>
            (decimal) que é equivalente ao
            <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
              {element}
            </div>
            (hexadecimal), <br />
          </div>
        );
      })}
      <div className="flex items-center gap-2">
        ao ultrapassar o
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          f
        </div>
        (hexadecimal) é necessario adicionar +1 quadradinho:
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white">
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          1
        </div>
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          5
        </div>
        (decimal) é igual a
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          F
        </div>
        (hexadecimal)
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white">
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          1
        </div>
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          6
        </div>
        (decimal) é igual a
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          1
        </div>
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          0
        </div>
        (hexadecimal)
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white">
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          3
        </div>
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          1
        </div>
        (decimal) é igual a
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          1
        </div>
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          F
        </div>
        (hexadecimal)
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-black/80 p-2 text-white">
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          3
        </div>
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          2
        </div>
        (decimal) é igual a
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          2
        </div>
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          0
        </div>
        <div className="binary-number rounded-lg  border border-[rgba(0,0,0,0.5)] py-2 px-4">
          0
        </div>
        (hexadecimal)
      </div>
    </div>
  );
};
