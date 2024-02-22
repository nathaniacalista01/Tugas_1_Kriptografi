import { EnigmaMachine, RotorInterface } from "../../type/engima.type";

interface EncryptEnigmaInterface {
  decryptText: string;
  firstRotor?: RotorInterface;
  secondRotor?: RotorInterface;
  thirdRotor?: RotorInterface;
}

export const decryptEnigma = ({
  decryptText,
  firstRotor,
  secondRotor,
  thirdRotor,
}: EncryptEnigmaInterface) => {
  const enigmaMachine = new EnigmaMachine(firstRotor, secondRotor, thirdRotor);
  const content =  decryptText.split(".")[0]
  const result = enigmaMachine.decrypt(content);
  return result;
};
