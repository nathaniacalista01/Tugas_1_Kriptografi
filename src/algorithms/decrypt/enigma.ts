import { EnigmaMachine, RotorInterface } from "../../type/engima.type";

interface EncryptEnigmaInterface {
  decryptText: string;
  firstRotor?: RotorInterface;
  secondRotor?: RotorInterface;
  thirdRotor?: RotorInterface;
  extension?: string;
}

export const decryptEnigma = ({
  decryptText,
  firstRotor,
  secondRotor,
  thirdRotor,
  extension,
}: EncryptEnigmaInterface) => {
  const enigmaMachine = new EnigmaMachine(firstRotor, secondRotor, thirdRotor);
  const result = enigmaMachine.decrypt(decryptText);
  if (extension) {
    return result + "." + extension;
  }
  return result;
};
