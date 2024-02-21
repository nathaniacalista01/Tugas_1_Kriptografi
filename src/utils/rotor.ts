import { RotorInterface } from "../type/engima.type";

export const isRotorValid = (rotor: RotorInterface) => {
  const cleanInnerRing = rotor.innerRing
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase();
  return (
    cleanInnerRing.length === 26 &&
    new Set(cleanInnerRing).size === 26 &&
    rotor.innerRing !== "" &&
    rotor.initialPosition !== ""
  );
};

export const converStringRotorToNumber = (stringRotor: string) => {
  return Array.from(stringRotor).map(
    (char) => char.charCodeAt(0) - "A".charCodeAt(0) + 1
  );
};
