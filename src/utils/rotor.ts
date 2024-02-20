import { RotorInterface } from "../type/engima.type";


export const isRotorValid = (rotor: RotorInterface) => {
    console.log(rotor.innerRing, rotor.initialPosition)
  return rotor.innerRing !== "" && rotor.initialPosition !== "";
};

export const converStringRotorToNumber = (stringRotor: string) => {
  return Array.from(stringRotor).map(
    (char) => char.charCodeAt(0) - "A".charCodeAt(0) + 1
  );
};
