import type { BaseTypes } from "~/types/conversorBases/conversorBasesTypes";
import { NumberStringComponent } from "../NumberStringComponent";
import { convertNumberStringToBase } from "./conversorPageUtils";

export const BaseComparisonComponent: React.FC<{
  numberStrings: string[];
  firstBaseName: BaseTypes;
  secondBaseName: BaseTypes;
  flexCol?: boolean;
}> = ({ numberStrings, firstBaseName, secondBaseName, flexCol = true }) => {
  return (
    <div className="flex gap-2 "
    style={{
      ...(flexCol && { flexDirection: flexCol ? "column" : "row" }),
    }}>
      {numberStrings.map((element, index) => {
        const firstNumber = element;
        const secondNumber = convertNumberStringToBase(
          firstNumber,
          firstBaseName,
          secondBaseName
        );

        return (
          <div
            
            className="flex flex-wrap items-center justify-center gap-2 rounded-lg bg-white p-2 text-black"
            key={index}
          >
            <div className="number-string-component flex flex-wrap items-center justify-center gap-2">
              <NumberStringComponent
                baseName={firstBaseName}
                numberString={firstNumber}
                borderColor={"rgba(0,0,0,0.5)"}
              />{" "}
            </div>
            equivale a{" "}
            <div className="number-string-component flex flex-wrap items-center justify-center gap-2">
              <NumberStringComponent
                baseName={secondBaseName}
                numberString={secondNumber}
                borderColor={"rgba(0,0,0,0.5)"}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default BaseComparisonComponent;
