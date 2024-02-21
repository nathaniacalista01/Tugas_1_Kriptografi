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
  const content =  decryptText.split(".")[0]
  const result = enigmaMachine.decrypt(content);
  if (extension) {
    return result + "." + extension;
  }
  return result;
};
