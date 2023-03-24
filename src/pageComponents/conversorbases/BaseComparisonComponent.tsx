import { BaseTypes } from "~/types/conversorBases/conversorBasesTypes";
import { NumberStringComponent } from "../NumberStringComponent";
import { convertNumberStringToBase } from "./conversorPageUtils";

export const BaseComparisonComponent: React.FC<{
  numberStrings: string[];
  firstBaseName: BaseTypes;
  secondBaseName: BaseTypes;
}> = ({ numberStrings, firstBaseName, secondBaseName }) => {
  return (
    <div className="flex flex-col gap-2">
      {numberStrings.map((element, index) => {
        const firstNumber = element;
        const secondNumber = convertNumberStringToBase(
          firstNumber,
          firstBaseName,
          secondBaseName
        );

        return (
          <div
            className="flex  items-center justify-center gap-2 rounded-lg bg-white p-2 text-black"
            key={index}
          >
            <NumberStringComponent
              baseName={firstBaseName}
              numberString={firstNumber}
              borderColor={"rgba(0,0,0,0.5)"}
            />{" "}
            equivale a{" "}
            <NumberStringComponent
              baseName={secondBaseName}
              numberString={secondNumber}
              borderColor={"rgba(0,0,0,0.5)"}
            />
          </div>
        );
      })}
    </div>
  );
};
export default BaseComparisonComponent;
