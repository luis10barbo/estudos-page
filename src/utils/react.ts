import type { Dispatch, SetStateAction } from "react";

export function objectChildState<T, key extends keyof T>(
  reactState: [T, Dispatch<SetStateAction<T>>],
  targetKey: key
): [T[key], Dispatch<SetStateAction<T[key]>>] {
  const [parentState, setParentState] = reactState;
  const childState: Dispatch<SetStateAction<T[key]>> = (value) => {
    if (value instanceof Function) {
      return setParentState((oldState) => {
        return { ...oldState, [targetKey]: value(oldState[targetKey]) };
      });
    }
    return setParentState((oldState) => {
      return { ...oldState, [targetKey]: value };
    });
  };

  return [parentState[targetKey], childState];
}

export function reverseState(state: Dispatch<SetStateAction<boolean>>) {
  state((oldState) => !oldState);
}

export function elementFocusHandler(
  element: HTMLElement,
  elementFocusState: Dispatch<SetStateAction<boolean>>
) {
  const handler = (e: MouseEvent) => {
    if (e.target && !element.contains(e.target as Node)) {
      elementFocusState(false);
    }
  };

  document.addEventListener("mousedown", handler);

  return () => {
    document.removeEventListener("mousedown", handler);
  };
}
