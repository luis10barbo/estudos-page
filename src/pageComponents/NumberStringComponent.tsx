import type { BaseTypes } from "~/types/conversorBases/conversorBasesTypes";
import { translateBaseName } from "./conversorbases/conversorPageUtils";

export const NumberStringComponent: React.FC<{
  children?: React.ReactNode | React.ReactNode[];
  numberString: string;
  baseName: BaseTypes;
  borderColor?: string;
}> = ({ children, baseName, numberString, borderColor }) => {
  const translatedBaseName: string = translateBaseName(baseName);

  const charSplit = children ? [...(children as string)] : [...numberString];
  return (
    <>
      {charSplit.map((char, index) => {
        return (
          <div
            key={index}
            style={{ ...(borderColor && { borderColor: borderColor }) }}
            className="w-fit binary-number flex rounded-lg border border-black/90 bg-white py-2 px-4 text-black "
          >
            {char}
          </div>
        );
      })}
      ({translatedBaseName})
    </>
  );
};
